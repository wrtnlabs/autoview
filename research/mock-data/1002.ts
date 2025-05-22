
import Component from "../components/1002";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":1024,"name":"example-image-sample","url":"https://api.example.com/packages/docker/example-image-sample/1024","package_html_url":"https://www.example.com/packages/docker/example-image-sample/1024","html_url":"https://hub.example.com/r/example-org/example-image-sample","license":"MIT (Sample)","description":"This is a sample Docker image version for UI testing. It includes placeholder metadata to demonstrate schema.","created_at":"2025-04-01T09:30:00Z","updated_at":"2025-05-19T12:00:00Z","metadata":{"package_type":"docker","docker":{"tag":["latest-test","v2.0.0-sample"]}}};
}
