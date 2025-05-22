
import Component from "../components/111";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"pagination":{"current":1,"limit":10,"records":2,"pages":1},"data":[{"id":"channel_SC_001","created_at":"2025-05-19T08:15:30Z","code":"WEB-STORE-TEST","name":"Online Store (Test Channel)"},{"id":"channel_SC_002","created_at":"2025-05-18T16:45:00Z","code":"MOBILE_APP_DUMMY","name":"Mobile App (Sample)"}]};
}
