
import Component from "../components/524";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_minutes_used":2600,"total_paid_minutes_used":500,"included_minutes":3000,"minutes_used_breakdown":{"UBUNTU":1500,"MACOS":600,"WINDOWS":500,"ubuntu_4_core":800,"ubuntu_8_core":400,"ubuntu_16_core":300,"windows_4_core":300,"windows_8_core":200,"macos_12_core":600,"total":2600}};
}
