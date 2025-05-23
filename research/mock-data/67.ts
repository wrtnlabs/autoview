
import Component from "../components/67";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"pagination":{"current":1,"limit":10,"records":2,"pages":1},"data":[{"id":"550e8400-e29b-41d4-a716-446655440000","citizen":{"id":"citizen-001","created_at":"2025-01-15T10:00:00Z","mobile":"+1-555-0123 (Sample)","name":"John Doe (Test Account)"},"deposit":{"id":"123e4567-e89b-12d3-a456-426614174000","created_at":"2025-05-18T09:12:34Z","code":"DEP1001_TEST","source":"Test Bank Sample","direction":1},"source_id":"f47ac10b-58cc-4372-a567-0e02b2c3d479","value":250,"balance":1250,"created_at":"2025-05-18T09:12:34Z"},{"id":"9c858901-8a57-4791-81fe-4c455b099bc9","citizen":{"id":"citizen-002","created_at":"2025-03-20T16:45:00Z","mobile":"+1-555-0456 (Dummy)","name":"Jane Smith (Sample)"},"deposit":{"id":"c56a4180-65aa-42ec-a945-5fd21dec0538","created_at":"2025-05-19T14:30:00Z","code":"WD2002_TEST","source":"Online Portal Sample","direction":-1},"source_id":"1c6b1473-7771-4a3b-ae27-05a6f7d3bc5f","value":100.25,"balance":1149.75,"created_at":"2025-05-19T14:30:00Z"}]};
}
