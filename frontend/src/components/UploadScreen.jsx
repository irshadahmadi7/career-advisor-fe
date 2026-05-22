import { useRef, useState, useEffect } from 'react';
import { BrandMark, Icon } from './Icons';

export default function UploadScreen({ onStart, error }) {
  const [file, setFile] = useState(null);
  const [isOver, setIsOver] = useState(false);
  const [howOpen, setHowOpen] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!howOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') setHowOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [howOpen]);

  function handleDrop(e) {
    e.preventDefault();
    setIsOver(false);
    const f = e.dataTransfer.files[0];
    if (f && f.type === 'application/pdf') setFile(f);
  }

  function handleFile(e) {
    const f = e.target.files[0];
    if (f) setFile(f);
  }

  return (
    <div className="app-shell">
      <div className="upload-nav">
        <a className="brand" href="#" onClick={(e) => e.preventDefault()}>
          <span className="brand-mark"><BrandMark /></span>
          <span>AI Career Advisor</span>
        </a>
        <div className="nav-links">
          <button
            className="btn btn-quiet"
            onClick={() => setHowOpen(true)}
          >
            How it works
          </button>
        </div>
      </div>

      {error && (
        <div style={{
          maxWidth: 1080, margin: '0 auto', padding: '0 32px',
          width: '100%',
        }}>
          <div style={{
            display: 'flex', alignItems: 'flex-start', gap: 10,
            padding: '12px 16px', borderRadius: 10,
            background: 'oklch(0.95 0.04 25)', border: '1px solid oklch(0.88 0.06 25)',
            color: 'oklch(0.38 0.12 25)', fontSize: 13.5,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <span><strong>Analysis failed</strong> — {error}</span>
          </div>
        </div>
      )}

      <div className="upload-screen">
        <div className="upload-wrap">
          <div className="upload-hero">
            <div className="fade-in">
              <span className="chip chip-primary">
                <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--primary)' }} />
                New · Personalised report in 60 seconds · Live postings
              </span>
              <h1>Upload your resume.<br />Get a <em>career playbook.</em></h1>
              <p className="sub">
                One PDF, sixty seconds. We read your resume, map it against live job postings,
                and return a structured report on what to learn, where to apply, and how to position yourself.
              </p>
              <ul className="feature-list">
                <li><span className="dot" /><span><strong>8–10 job suggestions</strong> with salary ranges and the reasoning behind each match.</span></li>
                <li><span className="dot" /><span><strong>3 career paths</strong> — IC, leadership, founder — with concrete next, mid-term, and end-goal roles.</span></li>
                <li><span className="dot" /><span><strong>Skill gap analysis</strong> calibrated against the level you're aiming for.</span></li>
                <li><span className="dot" /><span><strong>Live postings</strong> from the last 7 days, grouped by job title and ready to apply to.</span></li>
                <li><span className="dot" /><span><strong>5 resume improvements</strong> that reference the actual contents of your PDF — not generic tips.</span></li>
              </ul>
              <div className="trust-row">
                <div className="stat"><b>92%</b> rate the report "actionable"</div>
                <div className="stat"><b>GDPR</b> · we never store your PDF</div>
              </div>
            </div>

            <div className="dropzone-card fade-in d1">
              <span className="kicker">Step 01 · Upload</span>
              <div
                className={'dropzone' + (isOver ? ' is-over' : '') + (file ? ' has-file' : '')}
                onDragOver={(e) => { e.preventDefault(); setIsOver(true); }}
                onDragLeave={() => setIsOver(false)}
                onDrop={handleDrop}
                onClick={() => !file && inputRef.current?.click()}
                style={{ marginTop: 14 }}
              >
                <input ref={inputRef} type="file" accept="application/pdf" hidden onChange={handleFile} />
                {!file ? (
                  <>
                    <div className="dz-icon">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 16V4m0 0l-5 5m5-5l5 5"/>
                        <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"/>
                      </svg>
                    </div>
                    <div className="dz-title">Drop your resume here</div>
                    <div className="dz-sub">or <span className="dz-link">browse for a PDF</span> · max 10 MB</div>
                  </>
                ) : (
                  <div style={{ textAlign: 'left' }}>
                    <div className="kicker" style={{ color: 'var(--primary)' }}>Ready to analyse</div>
                    <div className="file-row" style={{ marginTop: 8 }}>
                      <div className="file-thumb">PDF</div>
                      <div className="file-meta">
                        <div className="file-name">{file.name}</div>
                        <div className="file-size">
                          {(file.size / 1024).toFixed(0)} KB
                        </div>
                      </div>
                      <button className="file-remove" onClick={(e) => { e.stopPropagation(); setFile(null); }} aria-label="Remove">
                        <Icon.close />
                      </button>
                    </div>
                  </div>
                )}
              </div>



              <div className="upload-cta-row">
                <span className="legal">Your file stays in memory. We don't store it.</span>
                <button
                  className="btn btn-primary btn-lg"
                  disabled={!file}
                  onClick={() => onStart(file)}
                >
                  Analyse my resume
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How it works modal */}
      <div
        className={'modal-scrim' + (howOpen ? ' open' : '')}
        onClick={() => setHowOpen(false)}
        role="presentation"
      />
      <div
        className={'modal' + (howOpen ? ' open' : '')}
        role="dialog"
        aria-modal="true"
        aria-labelledby="how-it-works-title"
        aria-hidden={!howOpen}
      >
        <button className="modal-close" onClick={() => setHowOpen(false)} aria-label="Close">
          <Icon.close />
        </button>
        <div className="modal-body">
          <div className="how-head">
            <span className="kicker">Behind the scenes</span>
            <h2 id="how-it-works-title">How it works</h2>
            <p className="lede">Four steps, sixty seconds. Two of them call an AI; two don't.</p>
          </div>
          <ol className="how-steps">
            <li>
              <div className="how-num">01</div>
              <div className="how-body">
                <h3>You upload a PDF</h3>
                <p>We extract the text with <code>pdfplumber</code> — no LLM call, no fuzzy parsing. What's on your page is what we read.</p>
              </div>
            </li>
            <li>
              <div className="how-num">02</div>
              <div className="how-body">
                <h3>The AI picks three job titles</h3>
                <p>A first model pass identifies the three roles that best match your background — the search keys for the next step.</p>
              </div>
            </li>
            <li>
              <div className="how-num">03</div>
              <div className="how-body">
                <h3>We pull live postings</h3>
                <p>For each title, JSearch returns real openings from the last seven days — no synthetic data, no stale boards.</p>
              </div>
            </li>
            <li>
              <div className="how-num">04</div>
              <div className="how-body">
                <h3>You get a structured report</h3>
                <p>A second model pass writes the full report: job fit, career paths, skill gaps, a learning plan, and five specific resume improvements.</p>
              </div>
            </li>
          </ol>
          <div className="how-footnote">
            <span className="mono">AI Career Advisor</span> · <span className="mono">pdfplumber</span> · resume stays in memory, never written to disk.
          </div>
        </div>
        <div className="modal-foot">
          <button className="btn btn-primary" onClick={() => setHowOpen(false)}>Got it</button>
        </div>
      </div>
    </div>
  );
}
