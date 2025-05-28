
import Component from "../components/493";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"name":"@example-org/ui-components-sample","url":"https://api.example.com/v1/packages/ui-components-sample/versions/101","package_html_url":"https://www.example.com/packages/ui-components-sample/101","html_url":"https://www.example.com/packages/ui-components-sample/101/details","license":"MIT (Sample)","description":"A sample npm package for UI components (Test).","created_at":"2025-05-18T09:15:00Z","updated_at":"2025-05-19T12:00:00Z","metadata":{"package_type":"npm"}},{"id":202,"name":"sample-container-package","url":"https://api.example.com/v1/packages/sample-container-package/versions/202","package_html_url":"https://www.example.com/packages/sample-container-package/202","html_url":"https://www.example.com/packages/sample-container-package/202/details","created_at":"2025-04-10T08:00:00Z","updated_at":"2025-04-15T17:30:00Z","deleted_at":"2025-05-01T00:00:00Z","metadata":{"package_type":"container","container":{"tags":["latest-test","v202-sample"]}}}];
}
