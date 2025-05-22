
import Component from "../components/741";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"key_id":"6d7f9b80-1234-5678-9abc-def012345678","key":"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsamplepublickeydatafake==","id":42,"url":"https://api.example.com/repos/sample-org/sample-repo/actions/secrets/public-key","title":"Sample Actions Public Key (Test)","created_at":"2025-05-19T14:30:00Z"};
}
