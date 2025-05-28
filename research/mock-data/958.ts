
import Component from "../components/958";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"key":"apiKey_sample_001","id":1024,"url":"https://api.example.com/v1/keys/apiKey_sample_001","title":"Sample API Key (Test)","created_at":"2025-05-19T14:30:00Z","verified":true,"read_only":false};
}
