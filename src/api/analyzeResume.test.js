import { describe, it, expect, vi, beforeEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '../test/mocks/server';
import { analyzeResume } from './analyzeResume';
import { MOCK_REPORT } from '../data/mockData';

const API_URL = 'https://irshad-ahmad-ai-career-advisor.hf.space/api/analyze';

function makeFile(name = 'resume.pdf', type = 'application/pdf') {
  return new File(['pdf content'], name, { type });
}

describe('analyzeResume', () => {
  it('returns data on success', async () => {
    const result = await analyzeResume(makeFile());
    expect(result).toMatchObject({ profile_summary: MOCK_REPORT.profile_summary });
  });

  it('sends a POST request with the file as multipart/form-data', async () => {
    let capturedRequest;
    server.use(
      http.post(API_URL, async ({ request }) => {
        capturedRequest = request;
        return HttpResponse.json({ success: true, data: MOCK_REPORT });
      }),
    );
    await analyzeResume(makeFile('my-resume.pdf'));
    expect(capturedRequest.method).toBe('POST');
    const formData = await capturedRequest.formData();
    expect(formData.get('file')).toBeTruthy();
  });

  it('throws when success is false', async () => {
    server.use(
      http.post(API_URL, () =>
        HttpResponse.json({ success: false, error: 'Could not parse resume' }),
      ),
    );
    await expect(analyzeResume(makeFile())).rejects.toThrow('Could not parse resume');
  });

  it('throws a friendly message on HTTP 400', async () => {
    server.use(http.post(API_URL, () => new HttpResponse(null, { status: 400 })));
    await expect(analyzeResume(makeFile())).rejects.toThrow('Invalid file');
  });

  it('throws a friendly message on HTTP 413', async () => {
    server.use(http.post(API_URL, () => new HttpResponse(null, { status: 413 })));
    await expect(analyzeResume(makeFile())).rejects.toThrow('too large');
  });

  it('throws a friendly message on HTTP 429', async () => {
    server.use(http.post(API_URL, () => new HttpResponse(null, { status: 429 })));
    await expect(analyzeResume(makeFile())).rejects.toThrow('rate limit');
  });

  it('throws a friendly message on HTTP 500', async () => {
    server.use(http.post(API_URL, () => new HttpResponse(null, { status: 500 })));
    await expect(analyzeResume(makeFile())).rejects.toThrow('server');
  });

  it('throws a friendly message on HTTP 502', async () => {
    server.use(http.post(API_URL, () => new HttpResponse(null, { status: 502 })));
    await expect(analyzeResume(makeFile())).rejects.toThrow(/model|AI/i);
  });

  it('throws a friendly message on HTTP 503', async () => {
    server.use(http.post(API_URL, () => new HttpResponse(null, { status: 503 })));
    await expect(analyzeResume(makeFile())).rejects.toThrow(/unavailable/i);
  });

  it('throws a connection error when fetch fails', async () => {
    server.use(http.post(API_URL, () => HttpResponse.error()));
    await expect(analyzeResume(makeFile())).rejects.toThrow('Could not reach the server');
  });
});
