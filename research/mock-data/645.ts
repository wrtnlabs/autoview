
import Component from "../components/645";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"slug":"my-sample-ci-bot","node_id":"NODEID_SampleIntegration_101","client_id":"Iv1.23456abcdef7890","owner":{"login":"test-owner-sample-org","type":"Organization","id":99001},"name":"Sample CI Monitor App (Test)","description":"A sample description for this GitHub App. This is dummy data for UI testing only.","external_url":"https://my-sample-ci-bot.example.org","html_url":"https://github.com/apps/my-sample-ci-bot-test","created_at":"2025-05-19T12:00:00Z","updated_at":"2025-05-20T08:30:00Z","permissions":{"issues":"read","contents":"write","metadata":"read","pull_requests":"write"},"events":["push","pull_request","issues"],"installations_count":5,"client_secret":"dummy_client_secret_sample","webhook_secret":"sample_webhook_secret_123","pem":"-----BEGIN PRIVATE KEY-----\nMIIBVwIBADANBgkqh...fake...IDAQAB\n-----END PRIVATE KEY-----"},{"id":102,"node_id":"NODEID_SampleIntegration_102","owner":{"login":"sample-user-test","type":"User","id":1002},"name":"Sample Integration Minimal (Test)","description":null,"external_url":"https://example.com/sample-integration-minimal","html_url":"https://github.com/apps/sample-integration-minimal","created_at":"2025-05-18T09:15:00Z","updated_at":"2025-05-18T09:15:00Z","permissions":{},"events":[]},null];
}
