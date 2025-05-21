
import Component from "../components/641";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return ["Dashboard (Sample Item)","Settings (Test Item)","Profile (Test User)","Notifications (Sample Item)"];
}
