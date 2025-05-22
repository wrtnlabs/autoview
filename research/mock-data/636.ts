
import Component from "../components/636";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"url":"https://api.example.com/v1/protected-branches/sample-enforced-policy","enabled":true};
}
