
import Component from "../components/1009";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"days_left_in_billing_cycle":12,"estimated_paid_storage_for_month":30,"estimated_storage_for_month":45};
}
