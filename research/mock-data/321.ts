
import Component from "../components/321";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":777,"slug":"sample-ci-monitor-app","node_id":"MDEyOkludGVncmF0aW9uNzc3","client_id":"IVUKK5VV7Z6Y3HJ5KRR3EXAMPLE","owner":{"description":"Sample enterprise for integration testing. All data is fictional.","html_url":"https://github.com/enterprises/sample-enterprise","website_url":"https://sample-enterprise.example.org","id":123456,"node_id":"MDQ6RW50ZXJwcmlzZVN0YWJsZU5vZGU=","name":"Sample Enterprise Inc. (Test)","slug":"sample-enterprise","created_at":"2024-01-10T08:30:00Z","updated_at":"2025-05-19T12:00:00Z","avatar_url":"https://example.com/avatars/sample-enterprise.png"},"name":"Sample CI Monitor App (Test)","description":"A sample GitHub App integration used for UI component testing purposes.","external_url":"https://ci-bot-sample.example.org","html_url":"https://github.com/apps/sample-ci-monitor-app","created_at":"2025-01-15T09:20:30Z","updated_at":"2025-05-18T16:45:00Z","permissions":{"actions":"write","checks":"read","metadata":"read","issues":"write","deployments":"read"},"events":["push","pull_request","issues","deployment"],"installations_count":7,"client_secret":"hdjshs7dheJH37H3djh3dhdj123test","webhook_secret":"whsec_exampletestsecret123","pem":"-----BEGIN RSA PRIVATE KEY-----\nMIIBPAIBAAJBALeSampleKeyDataForTestingPurposesOnly\n-----END RSA PRIVATE KEY-----"};
}
