
import Component from "../components/643";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return ["Dashboard Home (Sample)","User Profile (Test)","Settings Overview (Dummy)","Activity Logs (Sample Entry)","Notifications Center (Test Entry)"];
}
