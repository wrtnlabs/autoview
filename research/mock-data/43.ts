
import Component from "../components/43";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"pagination":{"current":1,"limit":10,"records":3,"pages":1},"data":[{"id":"channel_001_sample","created_at":"2025-05-19T10:00:00Z","code":"WEB_STORE","name":"Web Store (Test)"},{"id":"channel_002_sample","created_at":"2025-05-18T15:30:00Z","code":"MOBILE_APP","name":"Mobile App (Sample)"},{"id":"channel_003_sample","created_at":"2025-05-17T08:45:00Z","code":"MARKETPLACE","name":"Marketplace (Dummy)"}]};
}
