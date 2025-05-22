
import Component from "../components/502";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"name":"Sample Maven Registry Config (Test)","registry_type":"maven_repository","username":"ci-builder-sample","visibility":"selected","created_at":"2025-05-18T10:15:30Z","updated_at":"2025-05-19T14:30:00Z"};
}
