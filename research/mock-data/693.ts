
import Component from "../components/693";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"key_id":"test-key-id-001","key":"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsampleDummyKeyDataABCDEFGH==","id":101,"url":"https://api.example.com/codespaces/public-keys/101","title":"Codespaces Public Key (Test)","created_at":"2025-05-19T15:45:00Z"};
}
