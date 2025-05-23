
import Component from "../components/158";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"pagination":{"current":1,"limit":10,"records":3,"pages":1},"data":[{"id":"e2a1b2c3-d4e5-678f-9012-34567890abcd","value":25,"created_at":"2025-05-18T08:30:00Z"},{"id":"f3b2a1c4-d5e6-789f-0123-4567890abcde","value":50,"created_at":"2025-05-18T12:45:00Z"},{"id":"a4c3b2d1-e6f5-8901-ab23-567890abcdef","value":30,"created_at":"2025-05-19T09:00:00Z"}]};
}
