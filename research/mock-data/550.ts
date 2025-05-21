
import Component from "../components/550";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"url":"https://api.example.com/orgs/sample-org/teams/dev-team/memberships/maintainer123","role":"maintainer","state":"pending"};
}
