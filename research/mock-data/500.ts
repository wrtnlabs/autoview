
import Component from "../components/500";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"name":"Example Org Maven Registry (Test)","registry_type":"maven_repository","username":"ci-user-test","visibility":"selected","selected_repository_ids":[42,108,256],"created_at":"2025-05-18T11:45:00Z","updated_at":"2025-05-19T16:20:00Z"};
}
