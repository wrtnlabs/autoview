
import Component from "../components/312";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"url":"https://www.example.com/webhook/sample-payload","content_type":"json","secret":"dummy_secret_key_test","insecure_ssl":"0"};
}
