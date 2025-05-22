
import Component from "../components/115";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"pagination":{"current":1,"limit":10,"records":25,"pages":3},"data":[{"id":"e7f1b2c3-d4a5-6789-b0c1-d2e3f4a5b6c7","code":"FRUIT_SEC","name":"Fruit Corner (Test)","created_at":"2025-05-18T09:15:00Z"},{"id":"f8c2c3d4-e5f6-7890-a1b2-c3d4e5f6a7b8","code":"BUTCHER_SEC","name":"Butcher Section (Sample)","created_at":"2025-05-17T14:45:30Z"},{"id":"a1b2c3d4-e5f6-7890-a1b2-c3d4e5f6a7b9","code":"DAIRY_SEC","name":"Dairy Section (Dummy)","created_at":"2025-05-16T08:00:00Z"}]};
}
