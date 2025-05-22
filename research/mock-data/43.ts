
import Component from "../components/43";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"pagination":{"current":1,"limit":10,"records":3,"pages":1},"data":[{"id":"sc-001-test","created_at":"2025-05-19T09:00:00Z","code":"WEB_CHANNEL","name":"Web Store (Test)"},{"id":"sc-002-sample","created_at":"2025-05-18T14:30:00Z","code":"MOBILE_APP","name":"Mobile App (Sample)"},{"id":"sc-003-dummy","created_at":"2025-05-17T08:45:00Z","code":"PARTNER_STORE","name":"Partner Retail Network (Dummy)"}]};
}
