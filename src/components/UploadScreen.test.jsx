import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UploadScreen from './UploadScreen';

function makeFile(name = 'resume.pdf', type = 'application/pdf') {
  return new File(['pdf content'], name, { type });
}

function renderUpload(props = {}) {
  const onStart = vi.fn();
  const utils = render(<UploadScreen onStart={onStart} {...props} />);
  return { ...utils, onStart };
}

describe('UploadScreen', () => {
  it('renders hero copy and feature list', () => {
    renderUpload();
    expect(screen.getByText(/Upload your resume/i)).toBeInTheDocument();
    expect(screen.getByText(/8–10 job suggestions/i)).toBeInTheDocument();
    expect(screen.getByText(/3 career paths/i)).toBeInTheDocument();
    expect(screen.getByText(/Skill gap analysis/i)).toBeInTheDocument();
    // Use a more specific string that appears only in the feature list
    expect(screen.getByText(/from the last 7 days/i)).toBeInTheDocument();
    expect(screen.getByText(/5 resume improvements/i)).toBeInTheDocument();
  });

  it('analyse button is disabled with no file', () => {
    renderUpload();
    expect(screen.getByRole('button', { name: /Analyse my resume/i })).toBeDisabled();
  });

  it('shows file info after valid PDF drop', async () => {
    renderUpload();
    const dropzone = document.querySelector('.dropzone');
    const file = makeFile('my-cv.pdf');
    fireEvent.drop(dropzone, {
      dataTransfer: { files: [file] },
    });
    await waitFor(() => expect(screen.getByText('my-cv.pdf')).toBeInTheDocument());
    expect(screen.getByText(/Ready to analyse/i)).toBeInTheDocument();
  });

  it('ignores non-PDF file on drop', async () => {
    renderUpload();
    const dropzone = document.querySelector('.dropzone');
    const file = new File(['content'], 'doc.docx', { type: 'application/msword' });
    fireEvent.drop(dropzone, { dataTransfer: { files: [file] } });
    await waitFor(() =>
      expect(screen.queryByText('doc.docx')).not.toBeInTheDocument(),
    );
  });

  it('enables analyse button after file is selected', async () => {
    renderUpload();
    const dropzone = document.querySelector('.dropzone');
    fireEvent.drop(dropzone, { dataTransfer: { files: [makeFile()] } });
    await waitFor(() =>
      expect(screen.getByRole('button', { name: /Analyse my resume/i })).not.toBeDisabled(),
    );
  });

  it('calls onStart with file when analyse button is clicked', async () => {
    const { onStart } = renderUpload();
    const dropzone = document.querySelector('.dropzone');
    const file = makeFile();
    fireEvent.drop(dropzone, { dataTransfer: { files: [file] } });
    await waitFor(() =>
      expect(screen.getByRole('button', { name: /Analyse my resume/i })).not.toBeDisabled(),
    );
    await userEvent.click(screen.getByRole('button', { name: /Analyse my resume/i }));
    expect(onStart).toHaveBeenCalledWith(file);
  });

  it('removes file when remove button is clicked', async () => {
    renderUpload();
    const dropzone = document.querySelector('.dropzone');
    fireEvent.drop(dropzone, { dataTransfer: { files: [makeFile('cv.pdf')] } });
    await waitFor(() => expect(screen.getByText('cv.pdf')).toBeInTheDocument());
    await userEvent.click(screen.getByRole('button', { name: /Remove/i }));
    expect(screen.queryByText('cv.pdf')).not.toBeInTheDocument();
    expect(screen.getByText(/Drop your resume here/i)).toBeInTheDocument();
  });

  it('shows error banner when error prop is provided', () => {
    renderUpload({ error: 'File too large — max 10 MB.' });
    expect(screen.getByText(/Analysis failed/i)).toBeInTheDocument();
    expect(screen.getByText(/File too large/i)).toBeInTheDocument();
  });

  it('shows sample resume button when no file is selected', () => {
    renderUpload();
    expect(screen.getByText(/Try with a sample resume/i)).toBeInTheDocument();
  });

  it('hides sample resume button after a file is selected', async () => {
    renderUpload();
    const dropzone = document.querySelector('.dropzone');
    fireEvent.drop(dropzone, { dataTransfer: { files: [makeFile()] } });
    await waitFor(() =>
      expect(screen.queryByText(/Try with a sample resume/i)).not.toBeInTheDocument(),
    );
  });

  it('calls onStart with isSample flag when sample resume is clicked', async () => {
    const { onStart } = renderUpload();
    await userEvent.click(screen.getByText(/Try with a sample resume/i));
    await waitFor(() =>
      expect(screen.getByRole('button', { name: /Analyse my resume/i })).not.toBeDisabled(),
    );
    await userEvent.click(screen.getByRole('button', { name: /Analyse my resume/i }));
    expect(onStart).toHaveBeenCalledWith(
      expect.objectContaining({ isSample: true }),
    );
  });

  it('opens "How it works" modal when button is clicked', async () => {
    renderUpload();
    await userEvent.click(screen.getByRole('button', { name: /How it works/i }));
    expect(screen.getByRole('dialog')).toBeVisible();
    expect(screen.getByText(/Behind the scenes/i)).toBeInTheDocument();
  });

  it('closes modal when Escape is pressed', async () => {
    renderUpload();
    await userEvent.click(screen.getByRole('button', { name: /How it works/i }));
    await userEvent.keyboard('{Escape}');
    // After close, aria-hidden makes getByRole fail — query directly via class
    await waitFor(() =>
      expect(document.querySelector('.modal')).not.toHaveClass('open'),
    );
  });

  it('closes modal when "Got it" button is clicked', async () => {
    renderUpload();
    await userEvent.click(screen.getByRole('button', { name: /How it works/i }));
    await userEvent.click(screen.getByRole('button', { name: /Got it/i }));
    await waitFor(() =>
      expect(document.querySelector('.modal')).not.toHaveClass('open'),
    );
  });
});
