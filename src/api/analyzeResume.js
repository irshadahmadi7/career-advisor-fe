const API_BASE = 'https://irshad-ahmad-ai-career-advisor.hf.space';

const ERROR_MESSAGES = {
  400: 'Invalid file — please upload a PDF.',
  413: 'File too large — max 10 MB.',
  422: 'Could not read the file. Make sure it is a valid PDF.',
  429: 'API rate limit reached. Please wait a moment and try again.',
  500: 'Analysis failed on the server. Check that your API keys are configured.',
  502: 'AI model not found. Check the MODEL_ID environment variable.',
  503: 'AI service is temporarily unavailable. Please try again shortly.',
};

export async function analyzeResume(file) {
  const formData = new FormData();
  formData.append('file', file, file.name);

  let res;
  try {
    res = await fetch(`${API_BASE}/api/analyze`, { method: 'POST', body: formData });
  } catch {
    throw new Error('Could not reach the server. Check your connection and try again.');
  }

  if (!res.ok) {
    const known = ERROR_MESSAGES[res.status];
    if (known) throw new Error(known);
    let detail = '';
    try { detail = (await res.json()).detail || ''; } catch { /* ignore */ }
    throw new Error(detail || `Server error ${res.status}`);
  }

  const json = await res.json();
  if (!json.success) throw new Error(json.error || 'Analysis failed');
  return json.data;
}
