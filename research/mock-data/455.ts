
import Component from "../components/455";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"url":"https://hooks.example.com/webhook_sample","content_type":"json","secret":"dummy_secret_key_sample","insecure_ssl":0};
}
