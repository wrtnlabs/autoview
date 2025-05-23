
import Component from "../components/971";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"name":"@example-org/ui-components-sample","url":"https://api.example.com/packages/ui-components-sample/versions/101","package_html_url":"https://www.example.com/packages/ui-components-sample/releases/tag/v1.0.0","html_url":"https://www.example.com/@example-org/ui-components-sample/v1.0.0","license":"MIT","description":"A sample UI components library for testing layouts and styling in example projects.","created_at":"2025-05-19T09:00:00Z","updated_at":"2025-05-20T10:30:00Z","metadata":{"package_type":"npm"}},{"id":202,"name":"docker-sample-image","url":"https://api.example.com/packages/docker-sample-image/versions/202","package_html_url":"https://www.example.com/packages/docker-sample-image/releases/tag/v2.0.0","created_at":"2025-04-01T08:15:00Z","updated_at":"2025-04-15T12:00:00Z","metadata":{"package_type":"docker","docker":{"tag":["latest","2.0.0-sample"]}}}];
}
