
import Component from "../components/761";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"url":"https://hooks.example.com/webhook/sample-endpoint","content_type":"json","secret":"sample_secret_key_12345","insecure_ssl":0};
}
