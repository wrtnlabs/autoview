
import Component from "../components/67";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"pagination":{"current":1,"limit":10,"records":2,"pages":1},"data":[{"id":"a3c1e5b0-1234-4c3b-9a8f-abcdef012345","citizen":{"id":"citizen_test_001","created_at":"2025-05-18T09:15:30Z","mobile":"010-1234-5678","name":"Jane Doe (Test)"},"deposit":{"id":"b7d2c4e6-9876-4321-abcd-1234567890ab","created_at":"2025-05-18T09:16:00Z","code":"DEP-TEST-0001","source":"Web Portal (Test)","direction":1},"source_id":"c9d9a2b3-4567-89ab-cdef-0123456789ab","value":1500,"balance":3500,"created_at":"2025-05-18T09:16:01Z"},{"id":"d1f2e3c4-5678-4a9b-bcde-2345678901cd","citizen":{"id":"citizen_test_002","created_at":"2025-05-19T10:45:00Z","mobile":"010-8765-4321","name":"Sample User (Test)"},"deposit":{"id":"e2f3c4d5-6789-4b0c-def0-3456789012de","created_at":"2025-05-19T10:45:05Z","code":"DEP-TEST-0002","source":"Mobile App (Test)","direction":-1},"source_id":"f3a4b5c6-7890-4d1e-0f12-4567890123ef","value":500,"balance":3000,"created_at":"2025-05-19T10:45:06Z"}]};
}
