import { useEffect, useState } from 'react';
import { BrandMark, Icon } from './Icons';
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

const SECTIONS = [
  { id: 'profile', num: '01', label: 'Profile summary' },
  { id: 'jobs', num: '02', label: 'Job suggestions' },
  { id: 'paths', num: '03', label: 'Career paths' },
  { id: 'gap', num: '04', label: 'Skill gap' },
  { id: 'learn', num: '05', label: 'Skills to learn' },
  { id: 'roadmap', num: '06', label: 'Career roadmap' },
  { id: 'postings', num: '07', label: 'Live job postings' },
  { id: 'improve', num: '08', label: 'Resume improvements' },
];

export default function Dashboard({ data, onReset }) {
  const [active, setActive] = useState(SECTIONS[0].id);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-25% 0px -65% 0px', threshold: 0 }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 880) setDrawerOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const onNav = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 60, behavior: 'smooth' });
    setActive(id);
    setDrawerOpen(false);
  };

  const NavList = (
    <>
      <div>
        <div className="nav-title">Report</div>
        <ul className="nav-list" style={{ marginTop: 8 }}>
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <button
                className={'nav-link' + (active === s.id ? ' active' : '')}
                onClick={onNav(s.id)}
              >
                <span className="num">{s.num}</span>
                <span>{s.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );

  return (
    <div className="dash">
      <aside className="sidebar">
        <a className="brand" href="#" onClick={(e) => e.preventDefault()}>
          <span className="brand-mark"><BrandMark /></span>
          <span>AI Career Advisor</span>
        </a>

        <div className="sidebar-meta">
          <div className="name">
            {data.candidate_name}
            <span className="pill">Senior</span>
          </div>
          <div className="filename mono">{data.resume_filename}</div>
        </div>

        {NavList}

        <div className="sidebar-footer">
          <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center' }} onClick={onReset}>
            <Icon.refresh /> Upload new resume
          </button>
        </div>
      </aside>

      {/* Mobile drawer */}
      <div className={'drawer-scrim' + (drawerOpen ? ' open' : '')} onClick={() => setDrawerOpen(false)} />
      <aside className={'drawer' + (drawerOpen ? ' open' : '')} aria-hidden={!drawerOpen}>
        <div className="drawer-head">
          <a className="brand" href="#" onClick={(e) => e.preventDefault()}>
            <span className="brand-mark"><BrandMark /></span>
            <span>AI Career Advisor</span>
          </a>
          <button className="drawer-close" onClick={() => setDrawerOpen(false)} aria-label="Close menu">
            <Icon.close />
          </button>
        </div>
        <div className="sidebar-meta">
          <div className="name">
            {data.candidate_name}
            <span className="pill">Senior</span>
          </div>
          <div className="filename mono">{data.resume_filename}</div>
        </div>
        {NavList}
        <div className="sidebar-footer" style={{ marginTop: 'auto' }}>
          <button
            className="btn btn-ghost"
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={() => { setDrawerOpen(false); onReset(); }}
          >
            <Icon.refresh /> Upload new resume
          </button>
        </div>
      </aside>

      <main className="main">
        <div className="topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
            <button className="menu-btn" onClick={() => setDrawerOpen(true)} aria-label="Open navigation">
              <Icon.menu />
            </button>
            <div className="crumb">
              <span className="crumb-pre">Career report <span style={{ color: 'var(--ink-muted)' }}>/</span> </span>
              <b>{data.candidate_name}</b>
              <span className="chip" style={{ marginLeft: 12 }}>{data.uploaded_at}</span>
            </div>
          </div>
          <div className="topbar-actions">
            <button className="btn btn-quiet" onClick={() => window.print()}><Icon.download /> Export PDF</button>
            <button className="btn btn-ghost" onClick={onReset}>
              <Icon.refresh /> <span className="label-only-desktop">Start over</span>
            </button>
          </div>
        </div>

        <div className="main-inner">
          <ProfileSummary data={data} />
          <JobSuggestions data={data} />
          <CareerPaths data={data} />
          <SkillGap data={data} />
          <SkillsToLearn data={data} />
          <CareerRoadmap data={data} />
          <LiveJobs data={data} />
          <ResumeImprovements data={data} />

          <footer className="dash-footer">
            <span>Generated by AI Career Advisor · {data.uploaded_at}</span>
            <div className="links">
              <a href="#" onClick={(e) => e.preventDefault()}>Feedback</a>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
