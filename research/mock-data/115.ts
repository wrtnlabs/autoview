
import Component from "../components/115";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"pagination":{"current":1,"limit":10,"records":25,"pages":3},"data":[{"id":"section-001-sample","code":"FRUIT_CORNER","name":"Fruit Corner (Sample)","created_at":"2025-05-15T08:30:00Z"},{"id":"section-002-sample","code":"BUTCHER_CORNER","name":"Butcher Corner (Sample)","created_at":"2025-05-16T09:45:00Z"},{"id":"section-003-sample","code":"BAKERY_SECTION","name":"Bakery Section (Sample)","created_at":"2025-05-17T11:00:00Z"}]};
}
