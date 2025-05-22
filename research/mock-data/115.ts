
import Component from "../components/115";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"pagination":{"current":1,"limit":2,"records":5,"pages":3},"data":[{"id":"section-001-sample","code":"FRUIT_CORNER_TEST","name":"Fruit Corner (Sample)","created_at":"2025-05-18T10:15:00Z"},{"id":"section-002-sample","code":"BUTCHER_CORNER_TEST","name":"Butcher Corner (Sample)","created_at":"2025-05-17T14:45:30Z"}]};
}
