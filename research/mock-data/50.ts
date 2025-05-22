
import Component from "../components/50";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"section_fruit_001","code":"FRUIT_CORNER_001","name":"Fruit Corner (Sample)","created_at":"2025-05-19T14:30:00Z"};
}
