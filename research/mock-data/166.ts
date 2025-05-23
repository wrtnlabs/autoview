
import Component from "../components/166";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"pagination":{"current":1,"limit":10,"records":3,"pages":1},"data":[{"id":"section-001-sample","code":"FRUITS_CORNER_TEST","name":"Fruits Corner (Sample)","created_at":"2025-05-19T08:30:00Z"},{"id":"section-002-sample","code":"BAKERY_CORNER_TEST","name":"Bakery Corner (Sample)","created_at":"2025-05-19T09:00:00Z"},{"id":"section-003-sample","code":"DAIRY_CORNER_TEST","name":"Dairy Corner (Sample)","created_at":"2025-05-19T09:30:00Z"}]};
}
