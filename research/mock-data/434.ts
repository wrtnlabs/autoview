
import Component from "../components/434";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"key_id":"0123456789abcdef0123","key":"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArandomBase64SampleKeyDataXYZ12345==","id":12345,"url":"https://api.example.com/codespaces/public-keys/0123456789abcdef0123","title":"Sample Codespaces Public Key (Test)","created_at":"2025-05-19T14:30:00Z"};
}
