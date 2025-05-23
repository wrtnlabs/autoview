
import Component from "../components/637";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"url":"https://api.example.com/repos/sample-org/demo-repo/branches/main/protection/enforce_admins","enabled":true};
}
