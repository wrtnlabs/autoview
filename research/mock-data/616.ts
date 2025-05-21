
import Component from "../components/616";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"name":"MY_SAMPLE_VARIABLE (Test)","value":"dummy_value_ABC123","created_at":"2025-05-18T14:00:00Z","updated_at":"2025-05-19T16:20:30Z"};
}
