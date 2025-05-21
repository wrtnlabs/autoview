
import Component from "../components/1007";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_minutes_used":12000,"total_paid_minutes_used":9000,"included_minutes":2000,"minutes_used_breakdown":{"UBUNTU":6000,"MACOS":2500,"WINDOWS":3500,"ubuntu_4_core":3500,"ubuntu_8_core":2500,"windows_4_core":2000,"windows_8_core":1500,"macos_12_core":2500,"total":12000}};
}
