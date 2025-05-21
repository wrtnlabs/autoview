
import Component from "../components/321";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":42,"slug":"sample-ci-bot","node_id":"NODEID_SampleIntegration_12345","client_id":"Iv1.abcdef1234567890","owner":{"login":"test-owner-sample-org","type":"Organization","id":99001},"name":"Sample CI Bot (Test)","description":"A sample GitHub App for CI integration testing purposes. All data is fictional.","external_url":"https://my-sample-ci-bot.example.org","html_url":"https://github.com/apps/my-sample-ci-bot-test","created_at":"2025-05-19T14:30:00Z","updated_at":"2025-06-01T09:15:00Z","permissions":{"issues":"read","pull_requests":"write","metadata":"read","deployments":"read"},"events":["push","pull_request","issues","deployment"],"installations_count":3,"client_secret":"dummyclientsecret123456","webhook_secret":"dummywebhooksecret987654","pem":"-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDTestKeyFakeLine\n-----END PRIVATE KEY-----"};
}
