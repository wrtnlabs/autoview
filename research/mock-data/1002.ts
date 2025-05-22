
import Component from "../components/1002";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":42,"name":"@example-org/sample-package-version","url":"https://registry.example.com/@example-org/sample-package-version/42","package_html_url":"https://www.example.com/@example-org/sample-package-version/v42","html_url":"https://www.example.com/@example-org/sample-package-version/v42/docs","license":"MIT (Test)","description":"This is a sample description for the package version, used for UI testing of package metadata. All data is fictional and for demonstration only.","created_at":"2025-05-19T12:00:00Z","updated_at":"2025-05-20T08:30:00Z","metadata":{"package_type":"docker","container":{"tags":["latest","v1.2.0"]},"docker":{"tag":["alpha-test","beta-sample"]}}};
}
