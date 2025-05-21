
import Component from "../components/958";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"key":"APIKey_ABC123_SAMPLE","id":1024,"url":"https://api.example.com/v1/keys/APIKey_ABC123_SAMPLE","title":"Sample API Key (Test)","created_at":"2025-05-19T14:30:00Z","verified":true,"read_only":false};
}
