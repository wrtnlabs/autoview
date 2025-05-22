
import Component from "../components/494";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":1024,"name":"sample-docker-image-test","url":"https://api.example.com/packages/sample-docker-image-test/1.2.3","package_html_url":"https://www.example.com/packages/sample-docker-image-test","html_url":"https://www.example.com/packages/sample-docker-image-test/versions/1.2.3","license":"MIT","description":"This is a dummy description for the sample Docker image version. It is intended solely for UI testing and demonstration purposes.","created_at":"2025-05-18T12:00:00Z","updated_at":"2025-05-19T08:30:45Z","metadata":{"package_type":"docker","docker":{"tag":["v1.2.3-test","latest-test"]}}};
}
