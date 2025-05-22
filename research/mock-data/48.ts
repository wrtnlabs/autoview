
import Component from "../components/48";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"pagination":{"current":1,"limit":2,"records":3,"pages":2},"data":[{"id":"section-001","code":"SEC-FRT","name":"Fruit Corner (Test)","created_at":"2025-05-01T09:00:00Z"},{"id":"section-002","code":"SEC-MLK","name":"Dairy & Milk Section (Test)","created_at":"2025-05-02T10:15:30Z"}]};
}
