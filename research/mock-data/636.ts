
import Component from "../components/636";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"url":"https://api.example.com/repos/example-org/sample-repo/branches/main/protection/enforce-admins","enabled":true};
}
