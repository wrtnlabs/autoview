
import Component from "../components/957";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"key":"key_42_sample_value","id":42,"url":"https://api.example.com/v1/keys/key_42_sample_value","title":"Sample API Key (Test)","created_at":"2025-05-19T14:30:00Z","verified":true,"read_only":false};
}
