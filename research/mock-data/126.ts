
import Component from "../components/126";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"123e4567-e89b-12d3-a456-426614174000","created_at":"2025-05-19T14:30:00Z","company":"Sample Delivery Co. (Test)","name":"Jane Smith (Test)","mobile":"+1-555-987-6543"};
}
