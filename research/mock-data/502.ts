
import Component from "../components/502";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"name":"Sample Maven Registry Config (Test)","registry_type":"maven_repository","username":"ci-deploy-user-test","visibility":"selected","created_at":"2025-05-15T09:12:00Z","updated_at":"2025-05-16T11:45:30Z"};
}
