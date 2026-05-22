import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { MOCK_REPORT } from './data/mockData';

// Stub LoadingScreen so App tests stay fast and don't depend on animation timing
vi.mock('./components/LoadingScreen', () => ({
  default: ({ onDone, onError }) => (
    <div data-testid="loading-screen">
      <button
        onClick={() =>
          onDone({
            ...MOCK_REPORT,
            candidate_name: 'Maya Okonkwo',
            resume_filename: 'Maya_Okonkwo_Resume.pdf',
            resume_size: '284 KB',
            uploaded_at: 'Jan 1, 2025',
          })
        }
      >
        simulate done
      </button>
      <button onClick={() => onError('Analysis failed on the server.')}>
        simulate error
      </button>
    </div>
  ),
}));

beforeEach(() => {
  class MockIntersectionObserver {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
    constructor() {}
  }
  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
  vi.stubGlobal('scrollTo', vi.fn());
});

afterEach(() => {
  vi.unstubAllGlobals();
});

function makeFile() {
  return new File(['pdf'], 'resume.pdf', { type: 'application/pdf' });
}

async function advanceToLoading() {
  render(<App />);
  const dropzone = document.querySelector('.dropzone');
  fireEvent.drop(dropzone, { dataTransfer: { files: [makeFile()] } });
  await waitFor(() =>
    expect(screen.getByRole('button', { name: /Analyse my resume/i })).not.toBeDisabled(),
  );
  await userEvent.click(screen.getByRole('button', { name: /Analyse my resume/i }));
}

describe('App screen transitions', () => {
  it('starts on the upload screen', () => {
    render(<App />);
    expect(screen.getByText(/Upload your resume/i)).toBeInTheDocument();
    expect(screen.queryByTestId('loading-screen')).not.toBeInTheDocument();
  });

  it('transitions to loading screen after file submit', async () => {
    await advanceToLoading();
    expect(screen.getByTestId('loading-screen')).toBeInTheDocument();
    expect(screen.queryByText(/Upload your resume/i)).not.toBeInTheDocument();
  });

  it('transitions to dashboard after onDone', async () => {
    await advanceToLoading();
    await userEvent.click(screen.getByText('simulate done'));
    await waitFor(() =>
      expect(screen.getAllByText('Maya Okonkwo')[0]).toBeInTheDocument(),
    );
    expect(screen.queryByTestId('loading-screen')).not.toBeInTheDocument();
  });

  it('returns to upload screen with error banner after onError', async () => {
    await advanceToLoading();
    await userEvent.click(screen.getByText('simulate error'));
    await waitFor(() =>
      expect(screen.getByText(/Upload your resume/i)).toBeInTheDocument(),
    );
    // Check the error is shown — the strong tag has exact "Analysis failed" text
    expect(screen.getByText('Analysis failed')).toBeInTheDocument();
    expect(document.body.textContent).toContain('Analysis failed on the server.');
  });

  it('clears error and returns to clean upload screen after reset', async () => {
    await advanceToLoading();
    await userEvent.click(screen.getByText('simulate error'));
    await waitFor(() => screen.getByText(/Upload your resume/i));

    // Go through loading → dashboard
    const dropzone = document.querySelector('.dropzone');
    fireEvent.drop(dropzone, { dataTransfer: { files: [makeFile()] } });
    await waitFor(() =>
      expect(screen.getByRole('button', { name: /Analyse my resume/i })).not.toBeDisabled(),
    );
    await userEvent.click(screen.getByRole('button', { name: /Analyse my resume/i }));
    await userEvent.click(screen.getByText('simulate done'));
    await waitFor(() => screen.getAllByText('Maya Okonkwo')[0]);

    // Reset from dashboard
    await userEvent.click(screen.getByRole('button', { name: /Start over/i }));
    await waitFor(() => screen.getByText(/Upload your resume/i));
    expect(screen.queryByText('Analysis failed')).not.toBeInTheDocument();
  });
});
