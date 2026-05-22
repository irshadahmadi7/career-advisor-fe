import { http, HttpResponse } from 'msw';
import { MOCK_REPORT } from '../../data/mockData';

const API_URL = 'https://irshad-ahmad-ai-career-advisor.hf.space/api/analyze';

export const handlers = [
  http.post(API_URL, () => {
    return HttpResponse.json({ success: true, data: MOCK_REPORT });
  }),
];
