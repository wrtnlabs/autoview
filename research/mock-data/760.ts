
import Component from "../components/760";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"url":"https://hooks.example.com/webhook/sample-endpoint","content_type":"json","secret":"dummy_secret_key_test","insecure_ssl":"0"};
}
