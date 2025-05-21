
import Component from "../components/500";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"name":"Sample Private Registry Configuration (Test)","registry_type":"maven_repository","username":"ci-registry-user-sample","visibility":"selected","selected_repository_ids":[101,202,303],"created_at":"2025-05-19T09:15:00Z","updated_at":"2025-05-20T10:30:45Z"};
}
