
import Component from "../components/166";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"pagination":{"current":1,"limit":10,"records":3,"pages":1},"data":[{"id":"00000000-0000-0000-0000-000000000001","code":"FRUIT_CORNER","name":"Fruit Section (Sample)","created_at":"2025-05-19T09:00:00Z"},{"id":"00000000-0000-0000-0000-000000000002","code":"BUTCHER_SECTION","name":"Butcher Section (Test)","created_at":"2025-05-18T15:30:00Z"},{"id":"00000000-0000-0000-0000-000000000003","code":"BAKERY_ZONE","name":"Bakery Zone (Demo)","created_at":"2025-05-17T08:45:00Z"}]};
}
