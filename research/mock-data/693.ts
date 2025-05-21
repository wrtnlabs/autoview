
import Component from "../components/693";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"key_id":"test-key-id-001","key":"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsamplebase64publickeydata12345==","id":42,"url":"https://api.example.com/v1/codespaces/public-keys/test-key-id-001","title":"Sample Codespaces Public Key (Test)","created_at":"2025-05-19T14:30:00Z"};
}
