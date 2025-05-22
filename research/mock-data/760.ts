
import Component from "../components/760";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"url":"https://hooks.example.com/test-webhook-endpoint","content_type":"json","secret":"test_secret_webhook_key","insecure_ssl":"0"};
}
