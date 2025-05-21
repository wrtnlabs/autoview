
import Component from "../components/611";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"key_id":"test-key-id-001","key":"MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEY1qELm+89Ffk+abc123TESTKEYxyz==","id":101,"url":"https://api.example.com/repos/sample-org/sample-repo/actions/secrets/public-key","title":"Sample Actions Public Key (Test)","created_at":"2025-05-19T12:00:00Z"};
}
