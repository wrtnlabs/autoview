
import Component from "../components/411";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"key_id":"test_key_id_sample_001","key":"MIIBIjANBgkqhkiG9w0BAQEFAAOCggEBAK1f5lQnSampleBase64Key==","id":12345,"url":"https://api.example.com/repos/example-org/sample-repo/actions/public-key","title":"Actions Public Key (Test)","created_at":"2025-05-19T14:30:00Z"};
}
