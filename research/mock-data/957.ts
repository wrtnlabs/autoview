
import Component from "../components/957";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"key":"abc123def456_sample_key","id":42,"url":"https://api.example.com/v1/keys/42","title":"Sample API Key (Test)","created_at":"2025-05-19T14:30:00Z","verified":true,"read_only":false};
}
