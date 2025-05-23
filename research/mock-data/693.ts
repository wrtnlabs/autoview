
import Component from "../components/693";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"key_id":"test-key-001","key":"LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0K","id":42,"url":"https://api.example.com/codespaces/public-keys/42","title":"Codespaces Public Key (Sample)","created_at":"2025-05-19T14:30:00Z"};
}
