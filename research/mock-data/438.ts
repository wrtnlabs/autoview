
import Component from "../components/438";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"seat_breakdown":{"total":50,"added_this_cycle":5,"pending_cancellation":2,"pending_invitation":3,"active_this_cycle":40,"inactive_this_cycle":10},"public_code_suggestions":"block","ide_chat":"enabled","platform_chat":"disabled","cli":"unconfigured","seat_management_setting":"assign_selected","plan_type":"enterprise"};
}
