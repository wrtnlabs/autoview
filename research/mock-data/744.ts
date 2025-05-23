
import Component from "../components/744";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":3,"variables":[{"name":"SAMPLE_API_TOKEN","value":"token_ABC123_SAMPLE","created_at":"2025-05-17T08:30:00Z","updated_at":"2025-05-18T10:45:00Z"},{"name":"SAMPLE_DB_HOST","value":"dev-db-sample.internal.example.com","created_at":"2025-05-18T12:00:00Z","updated_at":"2025-05-19T12:00:00Z"},{"name":"FEATURE_FLAG_NEW_UI","value":"true","created_at":"2025-05-19T09:00:00Z","updated_at":"2025-05-19T09:00:00Z"}]};
}
