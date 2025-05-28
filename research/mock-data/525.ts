
import Component from "../components/525";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_gigabytes_bandwidth_used":50,"total_paid_gigabytes_bandwidth_used":48,"included_gigabytes_bandwidth":2};
}
