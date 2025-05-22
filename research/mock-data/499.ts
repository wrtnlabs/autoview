
import Component from "../components/499";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"configurations":[{"name":"Sample Maven Registry Config (Test)","registry_type":"maven_repository","username":"maven_user_test","visibility":"selected","created_at":"2025-05-19T08:15:30Z","updated_at":"2025-05-19T12:45:00Z"},{"name":"Dummy Maven Repo Config (Sample)","registry_type":"maven_repository","username":null,"visibility":"private","created_at":"2025-05-18T10:00:00Z","updated_at":"2025-05-18T10:00:00Z"}]};
}
