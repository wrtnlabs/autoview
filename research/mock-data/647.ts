
import Component from "../components/647";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":98765,"slug":"my-sample-ci-bot-test","node_id":"U_kgDOBsample123=","client_id":"Iv1.1234567890abcdef","owner":{"login":"test-owner-sample-org","type":"Organization","id":99001},"name":"Sample CI Monitor App (Test)","description":"A sample description for this GitHub App used for UI testing purposes.","external_url":"https://my-sample-ci-bot.example.org","html_url":"https://github.com/apps/my-sample-ci-bot-test","created_at":"2025-05-19T12:00:00Z","updated_at":"2025-05-19T14:30:00Z","permissions":{"issues":"read","metadata":"read","pull_requests":"write","deployments":"read"},"events":["push","pull_request","issues"],"installations_count":3,"client_secret":"secretkey_sample_12345","webhook_secret":"webhook_secret_sample_67890"},null];
}
