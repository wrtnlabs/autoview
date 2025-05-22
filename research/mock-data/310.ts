
import Component from "../components/310";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":98765,"slug":"sample-ci-monitor-app","node_id":"MDExOldlYi1BcHBfc2FtcGxl","client_id":"Iv1.abcdef1234567890","owner":{"id":123456,"node_id":"ENT_0123456_SampleLeak","name":"Sample Enterprise Inc. (Test)","slug":"sample-enterprise","description":"A sample enterprise account for testing GitHub app integrations. All data is fictional.","html_url":"https://github.com/enterprises/sample-enterprise","website_url":"https://sample-enterprise.example.net","created_at":"2025-01-15T08:30:00Z","updated_at":"2025-05-10T12:45:00Z","avatar_url":"https://example.com/avatars/sample-enterprise.png"},"name":"Sample CI Monitor App","description":"This is a dummy GitHub App for UI testing purposes. All content is fictional.","external_url":"https://my-sample-ci-bot.example.org","html_url":"https://github.com/apps/sample-ci-monitor-app","created_at":"2025-05-01T09:00:00Z","updated_at":"2025-05-19T14:30:00Z","permissions":{"issues":"read","pull_requests":"write","deployments":"read"},"events":["push","pull_request","issues"],"installations_count":15,"client_secret":"client_secret_value_test","webhook_secret":"webhook_secret_test","pem":"-----BEGIN RSA PRIVATE KEY-----\nMIIEpAIBAAKCAQEAtXsamplefakekey+ABC123==\n-----END RSA PRIVATE KEY-----"};
}
