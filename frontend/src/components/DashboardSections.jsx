import { Icon } from './Icons';

function LevelBar({ level }) {
  const map = { Beginner: 1, Intermediate: 2, Advanced: 3, Expert: 4 };
  const n = map[level] || 0;
  return (
    <div className="level-bar">
      <div className="dots">
        {[0, 1, 2, 3].map((i) => <i key={i} className={i < n ? 'on' : ''} />)}
      </div>
      <span className="text">{level}</span>
    </div>
  );
}

export function ProfileSummary({ data }) {
  return (
    <section className="section" id="profile">
      <div className="section-head">
        <div className="titles">
          <span className="section-num">01 / Profile</span>
          <h2 className="h-section">Profile summary</h2>
        </div>
      </div>
      <div className="card profile-card">
        <p className="quote">{data.profile_summary}</p>
        <div className="profile-meta-row">
          <div className="item">
            <span className="label">Candidate</span>
            <span className="val">{data.candidate_name}</span>
          </div>
          <div className="item">
            <span className="label">Resume</span>
            <span className="val">{data.resume_filename} · {data.resume_size}</span>
          </div>
          <div className="item">
            <span className="label">Analysed</span>
            <span className="val">{data.uploaded_at}</span>
          </div>
          <div className="item">
            <span className="label">Confidence</span>
            <span className="val" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span className="mono" style={{ fontSize: 13 }}>92%</span>
              <span className="chip chip-primary">High</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function JobSuggestions({ data }) {
  return (
    <section className="section" id="jobs">
      <div className="section-head">
        <div className="titles">
          <span className="section-num">02 / Job fit</span>
          <h2 className="h-section">Job suggestions</h2>
          <p className="lede">Roles where your background lines up. Ordered by match strength.</p>
        </div>
        <span className="chip">{data.job_suggestions.length} matches</span>
      </div>
      <div className="jobs-grid">
        {data.job_suggestions.map((j, i) => (
          <div className="card job-card" key={i}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
              <div className="title">{j.title}</div>
              <span className="mono" style={{ fontSize: 10.5, color: 'var(--ink-3)' }}>#{String(i + 1).padStart(2, '0')}</span>
            </div>
            <div className="salary">{j.salary_range}</div>
            <p className="why">{j.why_it_fits}</p>
            <div className="tags">
              {j.top_hiring_industries.map((t, k) => <span className="chip" key={k}>{t}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function CareerPaths({ data }) {
  return (
    <section className="section" id="paths">
      <div className="section-head">
        <div className="titles">
          <span className="section-num">03 / Trajectories</span>
          <h2 className="h-section">Career paths</h2>
          <p className="lede">Three realistic five-to-ten-year arcs from where you are today.</p>
        </div>
      </div>
      <div className="paths-grid">
        {data.career_paths.map((p, i) => (
          <div className="card path-card" key={i}>
            <div>
              <span className="kicker">Path {String.fromCharCode(65 + i)}</span>
              <div className="name" style={{ marginTop: 4 }}>{p.name}</div>
            </div>
            <p className="overview">{p.overview}</p>
            <div className="path-flow">
              <div className="path-step">
                <span className="marker">NEXT</span>
                <div className="label-row">
                  <span className="role">{p.next_role}</span>
                  <span className="when">0–18 months</span>
                </div>
              </div>
              <div className="path-arrow">↓</div>
              <div className="path-step">
                <span className="marker">MID</span>
                <div className="label-row">
                  <span className="role">{p.mid_term_role}</span>
                  <span className="when">2–4 years</span>
                </div>
              </div>
              <div className="path-arrow">↓</div>
              <div className="path-step">
                <span className="marker">GOAL</span>
                <div className="label-row">
                  <span className="role">{p.end_goal}</span>
                  <span className="when">5+ years</span>
                </div>
              </div>
            </div>
            <p className="path-why">
              <strong style={{ color: 'var(--ink)', fontWeight: 600 }}>Why it suits you · </strong>
              {p.why_it_suits}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function SkillGap({ data }) {
  return (
    <section className="section" id="gap">
      <div className="section-head">
        <div className="titles">
          <span className="section-num">04 / Calibration</span>
          <h2 className="h-section">Skill gap analysis</h2>
          <p className="lede">Where you are vs. where Staff/Principal roles expect you to be.</p>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <span className="gap-pill gap-none">No gap</span>
          <span className="gap-pill gap-minor">Minor</span>
          <span className="gap-pill gap-major">Major</span>
        </div>
      </div>
      <div className="card gap-table-wrap">
        <table className="gap-table">
          <thead>
            <tr>
              <th style={{ width: '32%' }}>Skill</th>
              <th>Current level</th>
              <th>Required level</th>
              <th style={{ textAlign: 'right' }}>Gap</th>
            </tr>
          </thead>
          <tbody>
            {data.skill_gap_analysis.map((r, i) => (
              <tr key={i}>
                <td className="skill-name">{r.skill}</td>
                <td><LevelBar level={r.current_level} /></td>
                <td><LevelBar level={r.required_level} /></td>
                <td style={{ textAlign: 'right' }}>
                  <span className={'gap-pill gap-' + r.gap.toLowerCase()}>
                    {r.gap === 'None' ? 'No gap' : r.gap}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function SkillsToLearn({ data }) {
  return (
    <section className="section" id="learn">
      <div className="section-head">
        <div className="titles">
          <span className="section-num">05 / Curriculum</span>
          <h2 className="h-section">Skills to learn</h2>
          <p className="lede">Eight priorities, ordered. The first three move the needle the most.</p>
        </div>
      </div>
      <div className="skills-grid">
        {data.skills_to_learn.map((s, i) => (
          <div className="card skill-card" key={i}>
            <div className="head">
              <div>
                <span className="priority">Priority {String(i + 1).padStart(2, '0')}</span>
                <div className="name">{s.skill}</div>
              </div>
              <span className="time-badge">{s.time_to_learn}</span>
            </div>
            <div className="row">
              <span className="label">Why it matters</span>
              <span className="text">{s.why_it_matters}</span>
            </div>
            <div className="row">
              <span className="label">How to learn</span>
              <span className="text">{s.how_to_learn}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function CareerRoadmap({ data }) {
  const r = data.career_roadmap;
  const phases = [
    { when: '0–3 months', name: 'Immediate', items: r.immediate_0_3_months, kind: 'list' },
    { when: '3–12 months', name: 'Short-term', items: r.short_term_3_12_months, kind: 'list' },
    { when: '1–3 years', name: 'Mid-term', items: r.mid_term_1_3_years, kind: 'prose' },
    { when: '3–7 years', name: 'Long-term', items: r.long_term_3_7_years, kind: 'prose' },
  ];
  return (
    <section className="section" id="roadmap">
      <div className="section-head">
        <div className="titles">
          <span className="section-num">06 / Sequence</span>
          <h2 className="h-section">Career roadmap</h2>
          <p className="lede">Four phases. Each one earns the next.</p>
        </div>
      </div>
      <div className="timeline">
        {phases.map((p, i) => (
          <div className="timeline-phase" key={i}>
            <div className="phase-head">
              <span className="phase-dot" style={{ opacity: 1 - i * 0.18 }} />
              <span className="phase-when">{p.when.toUpperCase()}</span>
              <span className="phase-name">{p.name}</span>
            </div>
            {p.kind === 'list' ? (
              <ul className="phase-actions">
                {p.items.map((a, k) => <li key={k}>{a}</li>)}
              </ul>
            ) : (
              <p className="phase-prose">{p.items}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export function LiveJobs({ data }) {
  const total = data.live_job_postings.reduce((n, g) => n + g.jobs.length, 0);
  return (
    <section className="section" id="postings">
      <div className="section-head">
        <div className="titles">
          <span className="section-num">07 / Open roles</span>
          <h2 className="h-section">Live job postings</h2>
          <p className="lede">Real openings, last 7 days · via JSearch.</p>
        </div>
        <span className="chip"><span className="mono">{total}</span> postings</span>
      </div>
      <div className="card" style={{ overflow: 'hidden' }}>
        {data.live_job_postings.map((g, i) => (
          <div className="posting-group" key={i}>
            <div className="group-head">
              <span className="title">{g.search_title}</span>
              <span className="count">{g.jobs.length} open</span>
            </div>
            <div className="posting-list">
              {g.jobs.map((j, k) => (
                <div className="posting" key={k}>
                  <div>
                    <div className="p-title">
                      {j.title} <span style={{ color: 'var(--ink-3)', fontWeight: 400 }}>· {j.company}</span>
                    </div>
                    <div className="p-meta">
                      <span>{j.location}</span>
                      <span className="sep">{j.employment_type}</span>
                      <span className="sep">{j.posted_date}</span>
                      {j.salary && j.salary !== 'Not disclosed' ? (
                        <span className="sep salary">{j.salary}</span>
                      ) : (
                        <span className="sep" style={{ color: 'var(--ink-muted)' }}>Salary not disclosed</span>
                      )}
                    </div>
                  </div>
                  <a className="apply-btn" href={j.apply_link} onClick={(e) => e.preventDefault()}>
                    Apply <Icon.external />
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ResumeImprovements({ data }) {
  return (
    <section className="section" id="improve">
      <div className="section-head">
        <div className="titles">
          <span className="section-num">08 / Polish</span>
          <h2 className="h-section">Resume improvements</h2>
          <p className="lede">Five specific edits, in priority order.</p>
        </div>
      </div>
      <div className="card" style={{ overflow: 'hidden' }}>
        <ol className="improve-list">
          {data.resume_improvements.map((t, i) => <li key={i}>{t}</li>)}
        </ol>
      </div>
    </section>
  );
}
