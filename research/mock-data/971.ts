
import Component from "../components/971";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"name":"test-data-generator-cli","url":"https://api.example.com/packages/test-data-generator-cli/versions/101","package_html_url":"https://www.example.com/packages/test-data-generator-cli/v1.0.0","html_url":"https://www.example.com/test-data-generator-cli/packages/101","license":"MIT","description":"A sample package version for testing the CLI data generator functionality. All data is fictional and for demonstration purposes only.","created_at":"2025-05-19T14:30:00Z","updated_at":"2025-05-20T09:15:00Z","metadata":{"package_type":"npm"}},{"id":202,"name":"sample-container-image","url":"https://api.example.com/packages/sample-container-image/versions/202","package_html_url":"https://www.example.com/packages/sample-container-image/v2.1.0","created_at":"2025-05-18T08:00:00Z","updated_at":"2025-05-21T16:45:30Z","deleted_at":"2025-06-01T12:00:00Z","metadata":{"package_type":"docker","docker":{"tag":["latest","1.2.3-sample"]}}}];
}
