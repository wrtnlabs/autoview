
import Component from "../components/920";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"url":"https://api.example.com/teams/sample-team/memberships/test-user-sample","role":"maintainer","state":"active"};
}
