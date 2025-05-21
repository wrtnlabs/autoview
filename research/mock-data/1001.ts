
import Component from "../components/1001";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"name":"test-data-generator-cli","url":"https://api.example.com/packages/101","package_html_url":"https://www.example.com/packages/test-data-generator-cli/v2.3.0","html_url":"https://www.example.com/packages/test-data-generator-cli","license":"MIT (Sample)","description":"A sample CLI tool for generating mock data for UI testing. All content herein is fictional and for demonstration only.","created_at":"2025-05-19T14:30:00Z","updated_at":"2025-06-01T10:00:00Z","metadata":{"package_type":"npm"}},{"id":102,"name":"example-container-image-sample","url":"https://api.example.com/packages/102","package_html_url":"https://www.example.com/packages/example-container-image-sample/v1.0.1","created_at":"2025-03-15T08:20:00Z","updated_at":"2025-04-10T12:30:00Z","deleted_at":"2025-07-01T12:00:00Z","metadata":{"package_type":"container","container":{"tags":["latest-sample","v1.0.1-test"]}}}];
}
