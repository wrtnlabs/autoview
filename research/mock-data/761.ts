
import Component from "../components/761";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"url":"https://api.example.com/webhooks/sample-endpoint","content_type":"json","secret":"dummy_secret_for_testing","insecure_ssl":"0"};
}
