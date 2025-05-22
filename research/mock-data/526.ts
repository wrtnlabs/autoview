
import Component from "../components/526";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"days_left_in_billing_cycle":12,"estimated_paid_storage_for_month":150,"estimated_storage_for_month":300};
}
