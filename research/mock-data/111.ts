
import Component from "../components/111";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"pagination":{"current":1,"limit":2,"records":5,"pages":3},"data":[{"id":"channel_001","created_at":"2025-05-19T14:30:00Z","code":"DEFAULT_CHANNEL","name":"Default Channel (Sample)"},{"id":"channel_002","created_at":"2025-05-20T09:15:00Z","code":"WEB_APP_CHANNEL","name":"Web Application Channel (Test)"}]};
}
