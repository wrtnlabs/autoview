
import Component from "../components/493";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"name":"@example-org/ui-components-sample","url":"https://api.example.com/packages/ui-components-sample/versions/101","package_html_url":"https://www.example.com/packages/ui-components-sample/v/101","html_url":"https://www.example.com/packages/ui-components-sample/v/101/docs","license":"MIT (Sample)","description":"A sample UI components library for testing UI rendering and placeholder content.","created_at":"2025-05-19T14:30:00Z","updated_at":"2025-05-20T09:15:00Z","metadata":{"package_type":"npm"}},{"id":202,"name":"docker-image-test-sample","url":"https://api.example.com/packages/docker-image-test-sample/versions/202","package_html_url":"https://www.example.com/packages/docker-image-test-sample/v/202","html_url":"https://www.example.com/packages/docker-image-test-sample/v/202/details","created_at":"2025-05-01T08:00:00Z","updated_at":"2025-05-10T12:30:00Z","metadata":{"package_type":"docker","container":{"tags":["latest","1.0.0-test"]},"docker":{"tag":["sample","test-release"]}}}];
}
