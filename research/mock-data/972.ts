
import Component from "../components/972";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":12345,"name":"test-data-generator-cli","url":"https://api.example.com/v1/packages/test-data-generator-cli/versions/12345","package_html_url":"https://www.example.com/packages/test-data-generator-cli/versions/12345","html_url":"https://www.example.com/packages/test-data-generator-cli/v1.2.3-test","license":"MIT","description":"A sample package version for testing UI components. All data is fictional and for demonstration purposes only.","created_at":"2025-05-19T14:30:00Z","updated_at":"2025-05-20T10:00:00Z","metadata":{"package_type":"docker","docker":{"tag":["v1.2.3-test","latest-sample"]}}};
}
