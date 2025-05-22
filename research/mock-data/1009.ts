
import Component from "../components/1009";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"days_left_in_billing_cycle":7,"estimated_paid_storage_for_month":50,"estimated_storage_for_month":60};
}
