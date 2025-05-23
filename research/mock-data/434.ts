
import Component from "../components/434";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"key_id":"ABCDEF1234567890","key":"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAfakeTestKeyDataZmFrZVNTQU1QTEU=","id":12345,"url":"https://api.example.com/codespaces/public-keys/ABCDEF1234567890","title":"Sample Codespaces Public Key (Test)","created_at":"2025-05-19T14:30:00Z"};
}
