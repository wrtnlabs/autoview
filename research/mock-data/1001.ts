
import Component from "../components/1001";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"name":"@example-org/ui-components-sample","url":"https://api.example.com/v1/packages/ui-components-sample/versions/101","package_html_url":"https://www.example.com/packages/ui-components-sample/releases/v1.0.0-sample","html_url":"https://www.example.com/ui-components-sample/v1.0.0-sample","license":"MIT","description":"A sample UI components library for building test applications. All content is fictional and for testing only.","created_at":"2025-05-15T08:30:00Z","updated_at":"2025-05-18T16:45:00Z","metadata":{"package_type":"npm"}},{"id":202,"name":"docker-sample-image","url":"https://api.example.com/v1/packages/docker-sample-image/versions/202","package_html_url":"https://www.example.com/packages/docker-sample-image/v202","created_at":"2025-05-10T12:00:00Z","updated_at":"2025-05-12T09:20:00Z","deleted_at":"2025-05-19T00:00:00Z","metadata":{"package_type":"docker","docker":{"tag":["latest-sample","v2.0.0-sample"]}}}];
}
