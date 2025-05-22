
import Component from "../components/310";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":12345,"slug":"sample-ci-bot","node_id":"MDExOkludGVncmF0aW9uU2FtcGxl","client_id":"Iv1.0123456789abcdef","owner":{"login":"sample-org","id":99001,"type":"Organization"},"name":"Sample CI Bot App (Test)","description":"A sample GitHub App for testing CI integration. All data is fictional and for UI testing only.","external_url":"https://my-sample-ci-bot.example.org","html_url":"https://github.com/apps/sample-ci-bot-test","created_at":"2025-05-01T12:00:00Z","updated_at":"2025-05-19T14:30:00Z","permissions":{"issues":"read","metadata":"read","pull_requests":"write","deployments":"read"},"events":["push","pull_request","deployment"],"installations_count":3,"client_secret":"abc123clientsecret_sample","webhook_secret":null,"pem":"-----BEGIN RSA PRIVATE KEY-----\nMIIEpAIBAAKCAQEAsamplekeydata\n-----END RSA PRIVATE KEY-----"};
}
