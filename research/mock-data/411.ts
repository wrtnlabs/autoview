
import Component from "../components/411";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"key_id":"test-key-id-001","key":"MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAK1SampleBase64PublicKeyString==","id":42,"url":"https://api.example.com/actions/public-keys/test-key-id-001","title":"Sample Actions Public Key (Test)","created_at":"2025-05-19T14:30:00Z"};
}
