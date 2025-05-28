
import Component from "../components/311";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"url":"https://webhook.example.com/payload/sample-endpoint","content_type":"json","secret":"sample_secret_dummy","insecure_ssl":"0"};
}
