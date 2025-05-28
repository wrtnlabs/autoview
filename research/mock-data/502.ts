
import Component from "../components/502";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"name":"Sample Org Private Registry (Test)","registry_type":"maven_repository","username":"ci-bot-sampleuser","visibility":"selected","created_at":"2025-05-18T09:15:00Z","updated_at":"2025-05-19T12:00:00Z"};
}
