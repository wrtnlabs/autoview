
import Component from "../components/583";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"enabled":true,"allowed_actions":"selected","selected_actions_url":"https://api.example.com/repos/example-org/sample-repo/actions/permissions/selected"};
}
