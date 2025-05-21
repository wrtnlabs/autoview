
import Component from "../components/48";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"pagination":{"current":1,"limit":10,"records":3,"pages":1},"data":[{"id":"sect-001","code":"FRUIT_CORNER","name":"Fruit Corner (Sample)","created_at":"2025-05-14T09:20:00Z"},{"id":"sect-002","code":"BUTCHER_CORNER","name":"Butcher Corner (Sample)","created_at":"2025-05-15T11:45:00Z"},{"id":"sect-003","code":"DAIRY_SECTION","name":"Dairy Section (Sample)","created_at":"2025-05-16T14:30:00Z"}]};
}
