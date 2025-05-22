
import Component from "../components/760";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"url":"https://hooks.example.com/v1/sample-webhook-endpoint","content_type":"json","secret":"whsec_test_secret_abc123","insecure_ssl":0};
}
