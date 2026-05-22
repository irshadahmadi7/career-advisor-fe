import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import LoadingScreen from './LoadingScreen';
import { MOCK_REPORT } from '../data/mockData';
import { analyzeResume } from '../api/analyzeResume';

// Mock the API module directly — avoids MSW and real fetch in these tests
vi.mock('../api/analyzeResume');

function makeSampleFile() {
  return { name: 'Maya_Okonkwo_Resume.pdf', size: 290816, isSample: true };
}

function makeRealFile() {
  return new File(['pdf content'], 'John_Doe_Resume.pdf', { type: 'application/pdf' });
}

beforeEach(() => {
  analyzeResume.mockResolvedValue(MOCK_REPORT);
  // Fake timers (including RAF and performance.now) so animation completes instantly
  vi.useFakeTimers({
    toFake: ['requestAnimationFrame', 'cancelAnimationFrame', 'setTimeout', 'clearTimeout', 'performance'],
  });
});

afterEach(() => {
  vi.useRealTimers();
  vi.clearAllMocks();
});

async function runAnimation() {
  await act(async () => {
    // Advance past animation (8000ms) + min display (3000ms) + finish (700ms)
    await vi.advanceTimersByTimeAsync(12000);
  });
}

describe('LoadingScreen', () => {
  it('renders all 4 step labels on mount', async () => {
    render(<LoadingScreen file={makeSampleFile()} onDone={vi.fn()} onError={vi.fn()} />);
    expect(screen.getByText(/Extracting text from your PDF/i)).toBeInTheDocument();
    expect(screen.getByText(/Identifying top job titles/i)).toBeInTheDocument();
    expect(screen.getByText(/Fetching live postings/i)).toBeInTheDocument();
    expect(screen.getByText(/Generating your career advice report/i)).toBeInTheDocument();
    await runAnimation(); // consume pending timers
  });

  it('renders progress percentage on mount', async () => {
    render(<LoadingScreen file={makeSampleFile()} onDone={vi.fn()} onError={vi.fn()} />);
    expect(screen.getByText(/\d+%/)).toBeInTheDocument();
    await runAnimation();
  });

  describe('sample file path', () => {
    it('calls onDone with MOCK_REPORT data including candidate_name', async () => {
      const onDone = vi.fn();
      render(<LoadingScreen file={makeSampleFile()} onDone={onDone} onError={vi.fn()} />);
      await runAnimation();
      expect(onDone).toHaveBeenCalled();
      const [data] = onDone.mock.calls[0];
      expect(data.candidate_name).toBe('Maya Okonkwo');
      expect(data.resume_filename).toBe('Maya_Okonkwo_Resume.pdf');
      expect(data.profile_summary).toBe(MOCK_REPORT.profile_summary);
    });

    it('does not call analyzeResume for a sample file', async () => {
      const onDone = vi.fn();
      render(<LoadingScreen file={makeSampleFile()} onDone={onDone} onError={vi.fn()} />);
      await runAnimation();
      expect(analyzeResume).not.toHaveBeenCalled();
    });
  });

  describe('real file path', () => {
    it('calls analyzeResume for a real file', async () => {
      const onDone = vi.fn();
      render(<LoadingScreen file={makeRealFile()} onDone={onDone} onError={vi.fn()} />);
      await runAnimation();
      expect(analyzeResume).toHaveBeenCalledWith(expect.any(File));
    });

    it('calls onDone with enriched data for a real file', async () => {
      const onDone = vi.fn();
      render(<LoadingScreen file={makeRealFile()} onDone={onDone} onError={vi.fn()} />);
      await runAnimation();
      expect(onDone).toHaveBeenCalled();
      const [data] = onDone.mock.calls[0];
      expect(data.candidate_name).toBe('John Doe Resume');
      expect(data.resume_filename).toBe('John_Doe_Resume.pdf');
      expect(data.resume_size).toMatch(/KB/);
      expect(data.uploaded_at).toBeTruthy();
    });

    it('calls onError when analyzeResume rejects', async () => {
      analyzeResume.mockRejectedValue(new Error('Analysis failed on the server.'));
      const onError = vi.fn();
      render(<LoadingScreen file={makeRealFile()} onDone={vi.fn()} onError={onError} />);
      await runAnimation();
      expect(onError).toHaveBeenCalledWith('Analysis failed on the server.');
    });
  });
});
