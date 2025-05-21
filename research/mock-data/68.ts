
import Component from "../components/68";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"550e8400-e29b-41d4-a716-446655440000","citizen":{"id":"CITIZEN-0001-SAMPLE","created_at":"2025-05-18T09:15:00Z","mobile":"+82-10-1234-5678","name":"Test User (Sample)"},"deposit":{"id":"d290f1ee-6c54-4b01-90e6-d701748f0851","created_at":"2025-05-19T14:25:00Z","code":"DEP-TEST-20250519-001","source":"SampleBank","direction":1},"source_id":"f47ac10b-58cc-4372-a567-0e02b2c3d479","value":250.5,"balance":1250.5,"created_at":"2025-05-19T14:30:00Z"};
}
