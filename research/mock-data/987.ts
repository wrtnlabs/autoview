
import Component from "../components/987";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"name":"@example-org/ui-components-sample","package_type":"npm","url":"https://api.example.com/v1/packages/ui-components-sample","html_url":"https://www.example.com/packages/ui-components-sample","version_count":12,"visibility":"public","created_at":"2025-05-19T10:00:00Z","updated_at":"2025-05-19T12:00:00Z"},{"id":202,"name":"docker/sample-container-test","package_type":"docker","url":"https://registry.example.com/v2/sample-container-test","html_url":"https://www.example.com/containers/sample-container-test","version_count":5,"visibility":"private","created_at":"2025-05-18T08:30:00Z","updated_at":"2025-05-19T09:15:00Z"}];
}
