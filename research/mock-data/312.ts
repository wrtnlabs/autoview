
import Component from "../components/312";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"url":"https://api.example.org/webhooks/sample-endpoint","content_type":"json","secret":"dummy_secret_123","insecure_ssl":"0"};
}
