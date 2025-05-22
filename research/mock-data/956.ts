
import Component from "../components/956";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"key":"test-key-001","id":101,"url":"https://api.example.com/v1/keys/test-key-001","title":"Test API Key (Sample)","created_at":"2025-05-18T09:15:30Z","verified":false,"read_only":false},{"key":"read-only-key-02","id":202,"url":"https://api.example.com/v1/keys/read-only-key-02","title":"Read-Only Key (Test)","created_at":"2025-05-19T14:00:00Z","verified":true,"read_only":true}];
}
