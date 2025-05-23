
import Component from "../components/494";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":101,"name":"sample-docker-image-test","url":"https://api.example.com/v1/packages/docker/sample-docker-image-test/versions/101","package_html_url":"https://www.example.com/packages/docker/sample-docker-image-test/versions/101","html_url":"https://www.example.com/packages/docker/sample-docker-image-test/versions/101/details","license":"Apache-2.0 (Test)","description":"A sample Docker image for testing UI rendering. All details are fictional and for demonstration only.","created_at":"2025-05-01T09:00:00Z","updated_at":"2025-05-10T16:30:00Z","deleted_at":"2025-05-15T12:00:00Z","metadata":{"package_type":"docker","docker":{"tag":["1.0.0-sample","latest"]}}};
}
