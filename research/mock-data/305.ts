
import Component from "../components/305";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"email":"test.user@example.com","phone":"+1-555-123-4567","token":"sample_token_abc123","formId":"form_sample_001","submittedAt":"2025-05-19T15:00:00Z","metadata":{"userAgent":"SampleAgent/1.0 Test","sessionId":"session_sample_7890"}};
}
