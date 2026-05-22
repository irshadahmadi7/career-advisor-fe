import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dashboard from './Dashboard';
import { MOCK_REPORT } from '../data/mockData';

const data = {
  ...MOCK_REPORT,
  candidate_name: 'Maya Okonkwo',
  resume_filename: 'Maya_Okonkwo_Resume.pdf',
  resume_size: '284 KB',
  uploaded_at: 'Jan 1, 2025, 09:00 AM',
};

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

describe('Dashboard', () => {
  it('renders all 8 section headings', () => {
    render(<Dashboard data={data} onReset={vi.fn()} />);
    expect(screen.getAllByText('Profile summary')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Job suggestions')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Career paths')[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Skill gap/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText('Skills to learn')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Career roadmap')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Live job postings')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Resume improvements')[0]).toBeInTheDocument();
  });

  it('renders all 8 sidebar nav items', () => {
    render(<Dashboard data={data} onReset={vi.fn()} />);
    const sidebar = document.querySelector('.sidebar');
    const navLabels = [
      'Profile summary', 'Job suggestions', 'Career paths', 'Skill gap',
      'Skills to learn', 'Career roadmap', 'Live job postings', 'Resume improvements',
    ];
    navLabels.forEach((label) => {
      expect(within(sidebar).getByText(label)).toBeInTheDocument();
    });
  });

  it('renders candidate name in sidebar and topbar', () => {
    render(<Dashboard data={data} onReset={vi.fn()} />);
    const instances = screen.getAllByText('Maya Okonkwo');
    expect(instances.length).toBeGreaterThanOrEqual(2);
  });

  it('calls window.print when Export PDF is clicked', async () => {
    const printSpy = vi.spyOn(window, 'print').mockImplementation(() => {});
    render(<Dashboard data={data} onReset={vi.fn()} />);
    await userEvent.click(screen.getByRole('button', { name: /Export PDF/i }));
    expect(printSpy).toHaveBeenCalledOnce();
    printSpy.mockRestore();
  });

  it('calls onReset when "Start over" button is clicked', async () => {
    const onReset = vi.fn();
    render(<Dashboard data={data} onReset={onReset} />);
    await userEvent.click(screen.getByRole('button', { name: /Start over/i }));
    expect(onReset).toHaveBeenCalledOnce();
  });

  it('calls onReset when "Upload new resume" sidebar button is clicked', async () => {
    const onReset = vi.fn();
    render(<Dashboard data={data} onReset={onReset} />);
    const sidebar = document.querySelector('.sidebar');
    await userEvent.click(within(sidebar).getByRole('button', { name: /Upload new resume/i }));
    expect(onReset).toHaveBeenCalledOnce();
  });

  it('opens mobile drawer when menu button is clicked', async () => {
    render(<Dashboard data={data} onReset={vi.fn()} />);
    const drawer = document.querySelector('.drawer');
    expect(drawer).not.toHaveClass('open');
    await userEvent.click(screen.getByRole('button', { name: /Open navigation/i }));
    expect(drawer).toHaveClass('open');
  });

  it('closes mobile drawer when scrim is clicked', async () => {
    render(<Dashboard data={data} onReset={vi.fn()} />);
    await userEvent.click(screen.getByRole('button', { name: /Open navigation/i }));
    const drawer = document.querySelector('.drawer');
    expect(drawer).toHaveClass('open');
    await userEvent.click(document.querySelector('.drawer-scrim'));
    expect(drawer).not.toHaveClass('open');
  });

  it('closes mobile drawer when close button inside drawer is clicked', async () => {
    render(<Dashboard data={data} onReset={vi.fn()} />);
    await userEvent.click(screen.getByRole('button', { name: /Open navigation/i }));
    await userEvent.click(screen.getByRole('button', { name: /Close menu/i }));
    expect(document.querySelector('.drawer')).not.toHaveClass('open');
  });
});
