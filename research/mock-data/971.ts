
import Component from "../components/971";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"name":"@example-org/ui-components-sample","url":"https://registry.example.com/v1/packages/@example-org/ui-components-sample/versions/1.2.3-test","package_html_url":"https://www.example.com/packages/@example-org/ui-components-sample/1.2.3-test","html_url":"https://github.com/example-org/ui-components-sample/releases/tag/v1.2.3-test","license":"MIT (Sample)","description":"A sample UI components package version for testing purposes.","created_at":"2025-05-18T09:30:00Z","updated_at":"2025-05-19T12:00:00Z","metadata":{"package_type":"npm","container":{"tags":["latest-sample","1.2.3-test"]},"docker":{"tag":["latest-sample","1.2.3-test"]}}},{"id":202,"name":"test-data-generator-cli","url":"https://api.example.org/packages/test-data-generator-cli/versions/0.9.0-dummy","package_html_url":"https://www.example.org/packages/test-data-generator-cli/0.9.0-dummy","created_at":"2025-04-01T00:00:00Z","updated_at":"2025-04-15T08:45:30Z","deleted_at":"2025-05-19T00:00:00Z","metadata":{"package_type":"docker","docker":{"tag":["sample","0.9.0-dummy"]}}}];
}
