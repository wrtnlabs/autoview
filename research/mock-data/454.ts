
import Component from "../components/454";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"url":"https://api.example.com/webhooks/sample-endpoint","content_type":"json","secret":"sample_secret_key_dummy","insecure_ssl":0};
}
