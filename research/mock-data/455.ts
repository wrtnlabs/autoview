
import Component from "../components/455";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"url":"https://api.example.com/webhooks/sample-endpoint","content_type":"json","secret":"dummy_secret_key_ABC123","insecure_ssl":"0"};
}
