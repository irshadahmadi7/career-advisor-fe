import { useEffect, useRef, useState } from 'react';
import { BrandMark, Icon } from './Icons';
import { analyzeResume } from '../api/analyzeResume';

const STEPS = [
  { label: 'Extracting text from your PDF', t: 1.2 },
  { label: 'Identifying top job titles for your background', t: 1.4 },
  { label: 'Fetching live postings from the last 7 days', t: 1.6 },
  { label: 'Generating your career advice report', t: 2.0 },
];

const totalT = STEPS.reduce((a, b) => a + b.t, 0);
const ANIM_CAP = 0.90;
const MIN_DISPLAY_MS = 3000;

export default function LoadingScreen({ file, onDone, onError }) {
  const [progress, setProgress] = useState(0);
  const apiResultRef = useRef(null);
  const animDoneRef = useRef(false);
  const startTimeRef = useRef(performance.now());

  function tryComplete() {
    if (!apiResultRef.current || !animDoneRef.current) return;
    const { data, error } = apiResultRef.current;
    if (error) { onError(error); return; }

    const startVal = ANIM_CAP;
    const startT = performance.now();
    const finish = () => {
      const p = Math.min(1, startVal + (1 - startVal) * ((performance.now() - startT) / 500));
      setProgress(p);
      if (p < 1) requestAnimationFrame(finish);
      else setTimeout(() => onDone(data), 200);
    };
    requestAnimationFrame(finish);
  }

  useEffect(() => {
    const duration = 8000;
    let raf;
    const tick = () => {
      const elapsed = performance.now() - startTimeRef.current;
      const p = Math.min(ANIM_CAP, elapsed / duration);
      setProgress(p);
      if (p < ANIM_CAP) {
        raf = requestAnimationFrame(tick);
      } else {
        animDoneRef.current = true;
        tryComplete();
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const elapsed = () => performance.now() - startTimeRef.current;

    const run = async () => {
      try {
        let data = await analyzeResume(file);
        const remaining = MIN_DISPLAY_MS - elapsed();
        if (remaining > 0) await new Promise((r) => setTimeout(r, remaining));
        data = {
          ...data,
          candidate_name: nameFromFile(file.name),
          resume_filename: file.name,
          resume_size: formatSize(file.size),
          uploaded_at: formatTimestamp(),
        };
        apiResultRef.current = { data };
      } catch (err) {
        apiResultRef.current = { error: err.message };
      }
      tryComplete();
    };

    run();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const completedT = (progress / ANIM_CAP) * totalT;
  let acc = 0;
  const stepStates = STEPS.map((s) => {
    const start = acc, end = acc + s.t;
    acc = end;
    if (completedT >= end) return 'done';
    if (completedT >= start) return 'active';
    return 'pending';
  });

  const isWaiting = animDoneRef.current && !apiResultRef.current;
  const pct = (progress * 100).toFixed(0);

  return (
    <div className="app-shell">
      <div className="upload-nav">
        <a className="brand" href="#" onClick={(e) => e.preventDefault()}>
          <span className="brand-mark"><BrandMark /></span>
          <span>AI Career Advisor</span>
        </a>
      </div>
      <div className="loading-screen">
        <div className="loading-card fade-in">
          <span className="kicker" style={{ color: 'var(--primary)' }}>Analyzing</span>
          <h2 style={{ marginTop: 8 }}>Reading your resume.</h2>
          <p className="sub">This usually takes 15–30 seconds. Don't close the tab.</p>
          <div className="progress" aria-label="progress">
            <div style={{ width: pct + '%' }} />
          </div>
          <div className="progress-row">
            <span className="mono">{pct}%</span>
            <span>
              {isWaiting
                ? 'Almost done — finalising report…'
                : progress >= 1
                ? 'Wrapping up…'
                : 'Estimated ' + Math.max(1, Math.ceil((1 - progress / ANIM_CAP) * totalT)) + 's remaining'}
            </span>
          </div>
          <ul className="steps">
            {STEPS.map((s, i) => (
              <li key={i} className={stepStates[i]}>
                <span className="ico">
                  {stepStates[i] === 'done' ? (
                    <Icon.check />
                  ) : stepStates[i] === 'active' ? (
                    <svg width="10" height="10" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="5" fill="currentColor" />
                    </svg>
                  ) : (
                    <svg width="10" height="10" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  )}
                </span>
                <span>{s.label}</span>
                {stepStates[i] === 'active' && (
                  <span className="mono" style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--ink-3)' }}>
                    running…
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function nameFromFile(filename) {
  return filename
    .replace(/\.pdf$/i, '')
    .replace(/[_-]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatSize(bytes) {
  if (!bytes) return '';
  return (bytes / 1024).toFixed(0) + ' KB';
}

function formatTimestamp() {
  return new Date().toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}
