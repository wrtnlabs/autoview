
import Component from "../components/111";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"pagination":{"current":1,"limit":2,"records":3,"pages":2},"data":[{"id":"channel_001","created_at":"2025-05-18T08:30:00Z","code":"WEB_STORE_TEST","name":"Web Store (Test)"},{"id":"channel_002","created_at":"2025-05-18T09:45:00Z","code":"MOBILE_APP_SAMPLE","name":"Mobile App (Sample)"}]};
}
