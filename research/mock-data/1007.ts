
import Component from "../components/1007";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_minutes_used":3500,"total_paid_minutes_used":1500,"included_minutes":2000,"minutes_used_breakdown":{"UBUNTU":2500,"MACOS":500,"WINDOWS":500,"ubuntu_8_core":80,"ubuntu_16_core":20,"windows_4_core":300,"windows_8_core":200,"macos_12_core":500,"total":3500}};
}
