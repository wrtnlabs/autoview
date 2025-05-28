
import Component from "../components/500";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"name":"Test Registry Config (Sample)","registry_type":"maven_repository","username":"maven_user_test","visibility":"selected","selected_repository_ids":[101,202,303],"created_at":"2025-05-19T09:00:00Z","updated_at":"2025-05-20T12:30:45Z"};
}
