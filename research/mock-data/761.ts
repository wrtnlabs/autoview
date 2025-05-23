
import Component from "../components/761";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"url":"https://webhooks.example.org/sample-endpoint","content_type":"json","secret":"dummySecretKey_ABC123","insecure_ssl":0};
}
