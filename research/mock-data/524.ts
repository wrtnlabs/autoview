
import Component from "../components/524";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_minutes_used":850,"total_paid_minutes_used":300,"included_minutes":2000,"minutes_used_breakdown":{"UBUNTU":500,"MACOS":200,"WINDOWS":150,"ubuntu_4_core":120,"ubuntu_8_core":150,"windows_4_core":150,"macos_12_core":200,"total":850}};
}
