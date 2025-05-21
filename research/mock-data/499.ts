
import Component from "../components/499";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":3,"configurations":[{"name":"Sample Maven Registry (Test)","registry_type":"maven_repository","username":"maven_user_sample","visibility":"all","created_at":"2025-04-10T08:15:30Z","updated_at":"2025-04-12T09:45:00Z"},{"name":"Test Private Registry Dummy","registry_type":"maven_repository","username":null,"visibility":"private","created_at":"2025-03-01T00:00:00Z","updated_at":"2025-03-05T11:30:00Z"},{"name":"Selected Repo Registry (Sample)","registry_type":"maven_repository","visibility":"selected","created_at":"2025-05-15T14:20:00Z","updated_at":"2025-05-18T16:00:00Z"}]};
}
