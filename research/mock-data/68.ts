
import Component from "../components/68";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"e3d77f3a-8d39-4a2b-b5d1-9f8e6c7d5b4a","citizen":{"id":"CITIZEN-001-SAMPLE","created_at":"2025-04-01T09:00:00Z","mobile":"010-8888-7777","name":"John Doe (Sample)"},"deposit":{"id":"b5d1e3d7-7f3a-8d39-4a2b-9f8e6c7d5b4a","created_at":"2025-05-19T14:30:00Z","code":"DEPOSIT_SAMPLE_001","source":"bank_transfer_sample","direction":1},"source_id":"0a1b2c3d-4e5f-6789-abcd-ef0123456789","value":150.75,"balance":1150.75,"created_at":"2025-05-19T14:35:00Z"};
}
