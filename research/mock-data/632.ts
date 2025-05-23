
import Component from "../components/632";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"url":"https://api.example.com/v1/branches/sample-protected-branch","enabled":true};
}
