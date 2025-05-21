
import Component from "../components/646";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"slug":"my-sample-ci-bot","node_id":"MDExOkludGVncmF0aW9uMQ==","client_id":"Iv1.23456789abcdef","owner":{"login":"test-owner-sample-org","type":"Organization","id":99001},"name":"Sample CI Monitor App","description":"A sample GitHub App for CI monitoring in test environment.","external_url":"https://my-sample-ci-bot.example.org","html_url":"https://github.com/apps/my-sample-ci-bot","created_at":"2025-05-19T14:30:00Z","updated_at":"2025-05-20T09:15:00Z","permissions":{"issues":"read","pull_requests":"write","metadata":"read","deployments":"read"},"events":["push","pull_request","check_run"],"installations_count":3,"client_secret":"secret_sample_client_abcdef123456","webhook_secret":"webhook_secret_sample_xyz","pem":"-----BEGIN RSA PRIVATE KEY-----\nMIIEoQI...sample...IDAQAB\n-----END RSA PRIVATE KEY-----"},null];
}
