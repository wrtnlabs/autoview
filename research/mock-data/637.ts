
import Component from "../components/637";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"url":"https://api.example.com/v1/test-protected-branch-settings","enabled":true};
}
