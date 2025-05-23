
import Component from "../components/438";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"seat_breakdown":{"total":150,"added_this_cycle":10,"pending_cancellation":5,"pending_invitation":8,"active_this_cycle":120,"inactive_this_cycle":30},"public_code_suggestions":"allow","ide_chat":"enabled","platform_chat":"disabled","cli":"unconfigured","seat_management_setting":"assign_selected","plan_type":"business"};
}
