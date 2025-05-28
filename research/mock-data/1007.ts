
import Component from "../components/1007";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_minutes_used":1500,"total_paid_minutes_used":300,"included_minutes":2000,"minutes_used_breakdown":{"UBUNTU":800,"MACOS":400,"WINDOWS":300,"ubuntu_4_core":200,"ubuntu_8_core":150,"macos_12_core":100,"windows_4_core":100,"windows_8_core":50,"total":1500}};
}
