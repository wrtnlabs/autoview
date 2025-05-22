
import Component from "../components/311";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"url":"https://example.com/webhook/sample-endpoint","content_type":"json","secret":"dummy_secret_key_sample","insecure_ssl":"0"};
}
