
import Component from "../components/1002";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":1024,"name":"test-data-generator-cli@1.0.0-sample","url":"https://api.example.com/packages/test-data-generator-cli/versions/1024","package_html_url":"https://www.example.com/packages/test-data-generator-cli/v/1.0.0-sample","html_url":"https://www.example.com/packages/test-data-generator-cli/v/1.0.0-sample/download","license":"MIT (Sample)","description":"This is a sample package version for testing UI components. All data is fictional and for demonstration purposes only.","created_at":"2025-05-19T12:00:00Z","updated_at":"2025-05-20T08:30:00Z","metadata":{"package_type":"npm","docker":{"tag":["1.0.0-sample","latest"]}}};
}
