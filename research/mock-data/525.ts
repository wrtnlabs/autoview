
import Component from "../components/525";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_gigabytes_bandwidth_used":42,"total_paid_gigabytes_bandwidth_used":30,"included_gigabytes_bandwidth":12};
}
