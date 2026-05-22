import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MOCK_REPORT } from '../data/mockData';
import {
  ProfileSummary,
  JobSuggestions,
  CareerPaths,
  SkillGap,
  SkillsToLearn,
  CareerRoadmap,
  LiveJobs,
  ResumeImprovements,
} from './DashboardSections';

const data = {
  ...MOCK_REPORT,
  candidate_name: 'Maya Okonkwo',
  resume_filename: 'Maya_Okonkwo_Resume.pdf',
  resume_size: '284 KB',
  uploaded_at: 'Jan 1, 2025, 09:00 AM',
};

describe('ProfileSummary', () => {
  it('renders candidate name and profile summary', () => {
    render(<ProfileSummary data={data} />);
    expect(screen.getByText('Maya Okonkwo')).toBeInTheDocument();
    expect(screen.getByText(data.profile_summary)).toBeInTheDocument();
    expect(screen.getByText(/Maya_Okonkwo_Resume\.pdf/)).toBeInTheDocument();
    expect(screen.getByText(/Jan 1, 2025/)).toBeInTheDocument();
  });

  it('shows confidence chip', () => {
    render(<ProfileSummary data={data} />);
    expect(screen.getByText('High')).toBeInTheDocument();
    expect(screen.getByText('92%')).toBeInTheDocument();
  });
});

describe('JobSuggestions', () => {
  it('renders all job suggestion titles', () => {
    const { container } = render(<JobSuggestions data={data} />);
    data.job_suggestions.forEach(({ title }) => {
      // job titles are rendered inside .job-card .title divs
      expect(container.textContent).toContain(title);
    });
  });

  it('renders salary ranges', () => {
    const { container } = render(<JobSuggestions data={data} />);
    data.job_suggestions.forEach(({ salary_range }) => {
      expect(container.textContent).toContain(salary_range);
    });
  });

  it('renders why_it_fits text for each job', () => {
    const { container } = render(<JobSuggestions data={data} />);
    data.job_suggestions.forEach(({ why_it_fits }) => {
      expect(container.textContent).toContain(why_it_fits);
    });
  });
});

describe('CareerPaths', () => {
  it('renders all 3 career path names', () => {
    render(<CareerPaths data={data} />);
    data.career_paths.forEach(({ name }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  it('renders next role, mid-term role, and end goal for each path', () => {
    render(<CareerPaths data={data} />);
    data.career_paths.forEach(({ next_role, mid_term_role, end_goal }) => {
      expect(screen.getByText(next_role)).toBeInTheDocument();
      expect(screen.getByText(mid_term_role)).toBeInTheDocument();
      expect(screen.getByText(end_goal)).toBeInTheDocument();
    });
  });
});

describe('SkillGap', () => {
  it('renders all skill names', () => {
    render(<SkillGap data={data} />);
    data.skill_gap_analysis.forEach(({ skill }) => {
      expect(screen.getByText(skill)).toBeInTheDocument();
    });
  });

  it('renders Major gap badges (rows + legend)', () => {
    render(<SkillGap data={data} />);
    const majorRowCount = data.skill_gap_analysis.filter((s) => s.gap === 'Major').length;
    // +1 for the legend badge at the top of the section
    expect(screen.getAllByText('Major').length).toBe(majorRowCount + 1);
  });

  it('renders "No gap" for None-gap skills (component maps None → "No gap")', () => {
    render(<SkillGap data={data} />);
    const noneRowCount = data.skill_gap_analysis.filter((s) => s.gap === 'None').length;
    // +1 for the legend badge labelled "No gap"
    expect(screen.getAllByText('No gap').length).toBe(noneRowCount + 1);
  });
});

describe('SkillsToLearn', () => {
  it('renders all skill card titles', () => {
    render(<SkillsToLearn data={data} />);
    data.skills_to_learn.forEach(({ skill }) => {
      expect(screen.getByText(skill)).toBeInTheDocument();
    });
  });

  it('renders time_to_learn for each skill', () => {
    render(<SkillsToLearn data={data} />);
    data.skills_to_learn.forEach(({ time_to_learn }) => {
      expect(screen.getByText(time_to_learn)).toBeInTheDocument();
    });
  });
});

describe('CareerRoadmap', () => {
  it('renders all 4 phase labels', () => {
    render(<CareerRoadmap data={data} />);
    // Component calls .toUpperCase() on the when string
    expect(screen.getByText('0–3 MONTHS')).toBeInTheDocument();
    expect(screen.getByText('3–12 MONTHS')).toBeInTheDocument();
    expect(screen.getByText('1–3 YEARS')).toBeInTheDocument();
    expect(screen.getByText('3–7 YEARS')).toBeInTheDocument();
  });

  it('renders immediate action items', () => {
    const { container } = render(<CareerRoadmap data={data} />);
    data.career_roadmap.immediate_0_3_months.forEach((item) => {
      expect(container.textContent).toContain(item);
    });
  });

  it('renders short-term action items', () => {
    const { container } = render(<CareerRoadmap data={data} />);
    data.career_roadmap.short_term_3_12_months.forEach((item) => {
      expect(container.textContent).toContain(item);
    });
  });
});

describe('LiveJobs', () => {
  it('renders all job group title elements', () => {
    render(<LiveJobs data={data} />);
    const titleEls = document.querySelectorAll('.group-head .title');
    expect(titleEls.length).toBe(data.live_job_postings.length);
    data.live_job_postings.forEach(({ search_title }, i) => {
      expect(titleEls[i].textContent).toBe(search_title);
    });
  });

  it('renders all company names', () => {
    const { container } = render(<LiveJobs data={data} />);
    data.live_job_postings.forEach(({ jobs }) => {
      jobs.forEach(({ company }) => {
        expect(container.textContent).toContain(company);
      });
    });
  });

  it('renders Apply links for every posting', () => {
    render(<LiveJobs data={data} />);
    const applyLinks = screen.getAllByRole('link', { name: /Apply/i });
    const totalJobs = data.live_job_postings.reduce((sum, g) => sum + g.jobs.length, 0);
    expect(applyLinks.length).toBe(totalJobs);
  });
});

describe('ResumeImprovements', () => {
  it('renders all improvement items', () => {
    const { container } = render(<ResumeImprovements data={data} />);
    data.resume_improvements.forEach((item) => {
      expect(container.textContent).toContain(item);
    });
  });

  it('renders correct item count', () => {
    render(<ResumeImprovements data={data} />);
    const items = screen.getAllByRole('listitem');
    expect(items.length).toBe(data.resume_improvements.length);
  });
});
