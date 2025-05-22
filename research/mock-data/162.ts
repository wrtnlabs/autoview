
import Component from "../components/162";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"pagination":{"current":1,"limit":10,"records":25,"pages":3},"data":[{"id":"channel_web_001","created_at":"2025-05-01T08:00:00Z","code":"WEB_STORE_TEST","name":"Web Store (Test)"},{"id":"channel_mobile_002","created_at":"2025-05-02T12:30:00Z","code":"MOBILE_APP_SAMPLE","name":"Mobile App (Sample)"},{"id":"channel_wholesale_003","created_at":"2025-05-03T15:45:00Z","code":"WHOLESALE_CHANNEL_DUMMY","name":"Wholesale Channel (Dummy)"}]};
}
