
import Component from "../components/493";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"name":"@example-org/ui-components-sample","url":"https://api.example.com/v1/packages/@example-org/ui-components-sample/101","package_html_url":"https://www.example.com/packages/@example-org/ui-components-sample/101","html_url":"https://www.example.com/packages/@example-org/ui-components-sample/101/details","license":"MIT","description":"A sample UI components package for testing purposes. All content herein is fictional and for demonstration only.","created_at":"2025-05-17T10:15:00Z","updated_at":"2025-05-18T12:00:00Z","metadata":{"package_type":"npm"}},{"id":102,"name":"sample-container-package","url":"https://api.example.org/v2/packages/sample-container-package/102","package_html_url":"https://www.example.org/packages/sample-container-package/102","description":"A dummy container package entry for UI testing. Deleted sample entry.","created_at":"2025-05-10T08:00:00Z","updated_at":"2025-05-15T09:30:00Z","deleted_at":"2025-05-16T11:45:00Z","metadata":{"package_type":"container","container":{"tags":["stable-sample","beta-test"]}}}];
}
