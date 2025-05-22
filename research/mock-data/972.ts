
import Component from "../components/972";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":101,"name":"1.0.0-sample","url":"https://api.example.com/v1/packages/test-data-generator-cli/versions/101","package_html_url":"https://registry.example.com/packages/test-data-generator-cli/1.0.0-sample","html_url":"https://www.example.com/test-data-generator-cli/releases/tag/1.0.0-sample","license":"MIT","description":"A sample package version description for testing UI rendering. All data is fictional.","created_at":"2025-05-19T14:00:00Z","updated_at":"2025-05-20T09:30:45Z","metadata":{"package_type":"docker","docker":{"tag":["1.0.0-test","latest-sample"]}}};
}
