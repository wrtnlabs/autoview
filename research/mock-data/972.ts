
import Component from "../components/972";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":1024,"name":"1.0.0-sample","url":"https://api.example.org/v1/packages/sample-ui-components-sample/versions/1.0.0-sample","package_html_url":"https://www.example.com/packages/sample-ui-components-sample/versions/1.0.0-sample","html_url":"https://www.example.com/packages/sample-ui-components-sample/releases/tag/1.0.0-sample","license":"MIT (Sample)","description":"This is a sample description for the 1.0.0-sample version of sample-ui-components-sample package. It demonstrates a fictional release used for UI testing.","created_at":"2025-03-15T09:30:00Z","updated_at":"2025-05-19T14:30:00Z","deleted_at":"2025-05-19T15:45:00Z","metadata":{"package_type":"npm"}};
}
