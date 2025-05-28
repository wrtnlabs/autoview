
import Component from "../components/586";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"default_workflow_permissions":"write","can_approve_pull_request_reviews":false};
}
