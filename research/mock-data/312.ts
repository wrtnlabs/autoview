
import Component from "../components/312";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"url":"https://api.example.com/v1/test-webhooks/sample-endpoint","content_type":"json","secret":"dummy_secret_key_12345","insecure_ssl":1};
}
