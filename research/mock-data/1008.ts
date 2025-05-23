
import Component from "../components/1008";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_gigabytes_bandwidth_used":70,"total_paid_gigabytes_bandwidth_used":20,"included_gigabytes_bandwidth":50};
}
