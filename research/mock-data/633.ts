
import Component from "../components/633";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"url":"https://api.example.com/v1/branches/protected-branch-admin-enforced","enabled":true};
}
