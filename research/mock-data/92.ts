
import Component from "../components/92";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"snapshot_test_001","created_at":"2025-05-19T15:45:00Z","format":"md","body":"Sample comment for the shopping sale inquiry snapshot (Test Data). It supports **bold**, _italic_, and inline `code` formatting. All data is fictional and for UI testing purposes only.","files":[{"name":"invoice_test","extension":"pdf","url":"https://www.example.com/test-files/invoice_test.pdf"},{"name":"README_sample","extension":null,"url":"https://www.example.com/test-files/README_sample"}]};
}
