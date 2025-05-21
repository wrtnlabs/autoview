
import Component from "../components/524";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_minutes_used":4000,"total_paid_minutes_used":3500,"included_minutes":2000,"minutes_used_breakdown":{"UBUNTU":2500,"MACOS":800,"WINDOWS":700,"ubuntu_4_core":1500,"ubuntu_8_core":800,"ubuntu_16_core":200,"ubuntu_32_core":0,"ubuntu_64_core":0,"windows_4_core":400,"windows_8_core":200,"windows_16_core":100,"windows_32_core":0,"windows_64_core":0,"macos_12_core":800,"total":4000}};
}
