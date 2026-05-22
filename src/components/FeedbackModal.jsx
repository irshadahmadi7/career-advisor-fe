import { useState, useEffect } from 'react';
import { Icon } from './Icons';

const TAG_OPTIONS = [
  'Job suggestions',
  'Career paths',
  'Skill gap',
  'Skills to learn',
  'Roadmap',
  'Live postings',
  'Resume edits',
  'Overall tone',
];

const RATING_LABELS = ['', 'Not useful', 'Meh', 'Okay', 'Useful', 'Excellent'];

export default function FeedbackModal({ open, onClose }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [useful, setUseful] = useState(null);
  const [tags, setTags] = useState([]);
  const [text, setText] = useState('');
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [open, onClose]);

  // Reset form after close animation finishes
  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setSent(false); setRating(0); setHover(0); setUseful(null);
        setTags([]); setText(''); setEmail('');
      }, 320);
      return () => clearTimeout(t);
    }
  }, [open]);

  function toggleTag(tag) {
    setTags((prev) => prev.includes(tag) ? prev.filter((x) => x !== tag) : [...prev, tag]);
  }

  async function submit(e) {
    e?.preventDefault();
    if (!rating) return;

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: '52f10b63-8658-488e-bb16-a4723080a315',
        subject: `Career Advisor Feedback — ${RATING_LABELS[rating]} (${rating}/5 stars)`,
        rating: `${rating}/5 — ${RATING_LABELS[rating]}`,
        actionable: useful === 'yes' ? 'Yes, clearly' : useful === 'kinda' ? 'Somewhat' : useful === 'no' ? 'Not really' : 'Not answered',
        sections_that_stood_out: tags.length ? tags.join(', ') : 'None selected',
        comments: text || '(none)',
        reply_to: email || '(not provided)',
      }),
    }).catch(() => {}); // fire-and-forget — don't block the success state

    setSent(true);
    setTimeout(onClose, 1600);
  }

  return (
    <>
      <div
        className={'modal-scrim' + (open ? ' open' : '')}
        onClick={onClose}
        role="presentation"
      />
      <div
        className={'modal modal-feedback' + (open ? ' open' : '')}
        role="dialog"
        aria-modal="true"
        aria-labelledby="fb-title"
        aria-hidden={!open}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <Icon.close />
        </button>

        {sent ? (
          <div className="modal-body fb-sent">
            <div className="fb-sent-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2>Thanks — got it.</h2>
            <p className="lede">Your feedback goes straight to the team. We read every one.</p>
          </div>
        ) : (
          <form className="modal-body" onSubmit={submit}>
            <div className="how-head">
              <span className="kicker">Help us tune the report</span>
              <h2 id="fb-title">How was your career report?</h2>
              <p className="lede">Two minutes. No login required.</p>
            </div>

            <div className="fb-field">
              <label className="fb-label">Overall</label>
              <div className="fb-stars" onMouseLeave={() => setHover(0)}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    type="button"
                    key={n}
                    className={'fb-star' + ((hover || rating) >= n ? ' on' : '')}
                    onMouseEnter={() => setHover(n)}
                    onClick={() => setRating(n)}
                    aria-label={n + ' star' + (n > 1 ? 's' : '')}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
                      <polygon points="12 2 15 9 22 9.5 17 14.5 18.5 22 12 18 5.5 22 7 14.5 2 9.5 9 9" />
                    </svg>
                  </button>
                ))}
                <span className="fb-rating-label">
                  {(hover || rating) ? RATING_LABELS[hover || rating] : 'Tap to rate'}
                </span>
              </div>
            </div>

            <div className="fb-field">
              <label className="fb-label">Did the report help you take action?</label>
              <div className="fb-segmented">
                {[
                  { v: 'yes', l: 'Yes, clearly' },
                  { v: 'kinda', l: 'Somewhat' },
                  { v: 'no', l: 'Not really' },
                ].map((o) => (
                  <button
                    type="button"
                    key={o.v}
                    className={'fb-seg' + (useful === o.v ? ' on' : '')}
                    onClick={() => setUseful(o.v)}
                  >
                    {o.l}
                  </button>
                ))}
              </div>
            </div>

            <div className="fb-field">
              <label className="fb-label">
                Which sections stood out?{' '}
                <span className="fb-optional">optional · pick any</span>
              </label>
              <div className="fb-chips">
                {TAG_OPTIONS.map((tag) => (
                  <button
                    type="button"
                    key={tag}
                    className={'fb-chip' + (tags.includes(tag) ? ' on' : '')}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="fb-field">
              <label className="fb-label" htmlFor="fb-text">
                Anything we should fix or build?
              </label>
              <textarea
                id="fb-text"
                className="fb-textarea"
                placeholder="e.g. 'Skill gap was the most useful, but the roadmap felt too generic.'"
                rows={3}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>

            <div className="fb-field">
              <label className="fb-label" htmlFor="fb-email">
                Email <span className="fb-optional">optional · if you'd like a reply</span>
              </label>
              <input
                id="fb-email"
                className="fb-input"
                type="email"
                placeholder="you@work.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </form>
        )}

        {!sent && (
          <div className="modal-foot">
            <span className="fb-foot-note">We never share feedback with employers.</span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-ghost" type="button" onClick={onClose}>Cancel</button>
              <button
                className="btn btn-primary"
                type="button"
                onClick={submit}
                disabled={!rating}
              >
                Send feedback
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
