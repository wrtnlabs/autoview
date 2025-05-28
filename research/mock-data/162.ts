
import Component from "../components/162";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"pagination":{"current":1,"limit":2,"records":3,"pages":2},"data":[{"id":"sc_0001","created_at":"2025-05-19T08:30:00Z","code":"WEB_STORE","name":"Web Store (Test)"},{"id":"sc_0002","created_at":"2025-05-20T09:45:00Z","code":"MOBILE_APP","name":"Mobile App (Sample)"}]};
}
