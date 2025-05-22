
import Component from "../components/611";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"key_id":"0123456789ABCDEF","key":"MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC3sampleBase64Key==","id":42,"url":"https://api.example.com/v1/actions/secrets/public-key/0123456789ABCDEF","title":"Sample Actions Public Key (Test)","created_at":"2025-05-19T14:30:00Z"};
}
