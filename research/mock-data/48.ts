
import Component from "../components/48";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"pagination":{"current":1,"limit":10,"records":25,"pages":3},"data":[{"id":"sec-001","code":"FRU123","name":"Fruit Corner (Sample)","created_at":"2025-05-10T08:30:00Z"},{"id":"sec-002","code":"DAI456","name":"Dairy Section (Test)","created_at":"2025-05-11T09:45:00Z"},{"id":"sec-003","code":"BAK789","name":"Bakery Section (Sample)","created_at":"2025-05-12T11:20:00Z"}]};
}
