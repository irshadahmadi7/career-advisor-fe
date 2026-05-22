export function BrandMark() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 6 V5 Q9 3.5 10.5 3.5 H13.5 Q15 3.5 15 5 V6"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <rect x="3" y="6" width="18" height="15" rx="2.2"
            stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <line x1="3" y1="10.4" x2="21" y2="10.4"
            stroke="currentColor" strokeWidth="1" opacity="0.8"/>
      <text x="12" y="17.6" textAnchor="middle"
            fontFamily="Inter, Arial, system-ui, sans-serif"
            fontSize="6.4" fontWeight="800"
            letterSpacing="-0.2"
            fill="currentColor">AI</text>
    </svg>
  );
}

export const Icon = {
  upload: () => (
    <svg className="ico-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 16V4m0 0l-5 5m5-5l5 5"/>
      <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"/>
    </svg>
  ),
  spark: () => (
    <svg className="ico-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/>
    </svg>
  ),
  arrow: () => (
    <svg className="ico-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6"/>
    </svg>
  ),
  external: () => (
    <svg className="ico-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M9 7h8v8"/>
    </svg>
  ),
  refresh: () => (
    <svg className="ico-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 0115.5-6.3L21 8"/>
      <path d="M21 3v5h-5"/>
      <path d="M21 12a9 9 0 01-15.5 6.3L3 16"/>
      <path d="M3 21v-5h5"/>
    </svg>
  ),
  download: () => (
    <svg className="ico-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4v12m0 0l-5-5m5 5l5-5"/>
      <path d="M4 20h16"/>
    </svg>
  ),
  doc: () => (
    <svg className="ico-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9z"/>
      <path d="M14 3v6h6"/>
      <path d="M8 13h8M8 17h6"/>
    </svg>
  ),
  check: () => (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  menu: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6" x2="21" y2="6"/>
      <line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  ),
  close: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  info: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--ink-muted)" }}>
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 16v-4M12 8h.01"/>
    </svg>
  ),
};
