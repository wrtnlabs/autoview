
import Component from "../components/957";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"key":"sample_key_001","id":101,"url":"https://api.example.com/v1/keys/sample_key_001","title":"Sample API Key (Test)","created_at":"2025-05-19T14:30:00Z","verified":true,"read_only":false};
}
