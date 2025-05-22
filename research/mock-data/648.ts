
import Component from "../components/648";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":1024,"slug":"sample-ci-bot","node_id":"MDExOkludGVncmF0aW9uOTEyMw==","client_id":"Iv1.1234567890abcdef","owner":{"login":"test-org-sample","type":"Organization","id":99001},"name":"Sample CI Bot (Test)","description":"This is a sample GitHub App used for UI testing purposes. All data is fictitious.","external_url":"https://ci-sample-app.example.org","html_url":"https://github.com/apps/sample-ci-bot","created_at":"2025-05-19T14:30:00Z","updated_at":"2025-05-20T09:15:00Z","permissions":{"issues":"read","contents":"write","pull_requests":"write","deployments":"read"},"events":["push","pull_request","deployment"],"installations_count":3,"client_secret":"secret_sample_client_secret","webhook_secret":"webhook_secret_sample","pem":"-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASC...samplepem...IDAQAB\n-----END PRIVATE KEY-----"},null];
}
