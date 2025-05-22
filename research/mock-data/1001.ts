
import Component from "../components/1001";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"name":"@example-org/ui-components-sample","url":"https://api.example.org/packages/ui-components-sample/versions/101","package_html_url":"https://www.example.org/packages/ui-components-sample/v/101","html_url":"https://www.example.com/ui-components-sample/v1.0.1-test","license":"MIT (Sample)","description":"A sample description for this UI components package version used for testing. All content herein is fictional and for demonstration only.","created_at":"2025-05-18T12:00:00Z","updated_at":"2025-05-19T08:30:00Z","metadata":{"package_type":"npm"}},{"id":102,"name":"sample-docker-image-test","url":"https://api.example.org/packages/sample-docker-image-test/versions/102","package_html_url":"https://www.example.org/packages/sample-docker-image-test/v/102","description":"Dummy Docker image package version for UI testing scenarios. Use this sample for rendering container metadata.","created_at":"2025-05-17T09:15:00Z","updated_at":"2025-05-18T11:45:00Z","deleted_at":"2025-05-19T07:00:00Z","metadata":{"package_type":"docker","docker":{"tag":["2.0.0-test","latest-test"]}}}];
}
