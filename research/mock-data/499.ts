
import Component from "../components/499";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"configurations":[{"name":"Sample Maven Registry Config (Test)","registry_type":"maven_repository","username":"maven_user_sample","visibility":"selected","created_at":"2025-05-19T14:30:00Z","updated_at":"2025-05-20T10:00:00Z"},{"name":"Dummy Backup Maven Registry (Test)","registry_type":"maven_repository","username":null,"visibility":"all","created_at":"2024-12-01T09:15:30Z","updated_at":"2025-01-10T11:45:00Z"}]};
}
