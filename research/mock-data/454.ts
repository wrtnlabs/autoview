
import Component from "../components/454";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"url":"https://api.example.com/webhooks/sample-001-delivery","content_type":"json","secret":"dummy-secret-key-ABC123","insecure_ssl":0};
}
