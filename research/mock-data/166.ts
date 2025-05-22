
import Component from "../components/166";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"pagination":{"current":1,"limit":20,"records":3,"pages":1},"data":[{"id":"sec-001-sample","code":"FRUIT_CORNER","name":"Fruit Corner (Test Section)","created_at":"2025-05-19T08:00:00Z"},{"id":"sec-002-sample","code":"DAIRY_SECTION","name":"Dairy Section (Sample)","created_at":"2025-05-19T09:30:00Z"},{"id":"sec-003-sample","code":"BAKERY_ZONE","name":"Bakery Zone (Dummy)","created_at":"2025-05-19T10:15:00Z"}]};
}
