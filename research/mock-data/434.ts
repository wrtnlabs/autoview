
import Component from "../components/434";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"key_id":"sample-key-id-abc123","key":"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwSampleBase64Data1234567890AbCdEfGhIjKlMnOpQrStUvWxYz==","id":42,"url":"https://api.example.com/v1/codespaces_public_keys/42","title":"Sample Codespaces Public Key (Test)","created_at":"2025-05-19T14:30:00Z"};
}
