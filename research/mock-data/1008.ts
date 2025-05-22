
import Component from "../components/1008";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_gigabytes_bandwidth_used":2250,"total_paid_gigabytes_bandwidth_used":2000,"included_gigabytes_bandwidth":250};
}
