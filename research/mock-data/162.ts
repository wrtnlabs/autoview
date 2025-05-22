
import Component from "../components/162";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"pagination":{"current":1,"limit":10,"records":25,"pages":3},"data":[{"id":"channel-001","created_at":"2025-05-15T09:30:00Z","code":"ONLINE_STORE","name":"Online Store (Test)"},{"id":"channel-002","created_at":"2025-04-20T14:45:00Z","code":"MOBILE_APP","name":"Mobile App (Sample)"},{"id":"channel-003","created_at":"2025-03-10T16:20:00Z","code":"PARTNER_API","name":"Partner API (Dummy)"}]};
}
