
import Component from "../components/391";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"default_workflow_permissions":"write","can_approve_pull_request_reviews":false};
}
