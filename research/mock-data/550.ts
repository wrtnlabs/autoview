
import Component from "../components/550";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"url":"https://api.example.com/teams/sample-team-123/memberships/sample-user-456","role":"maintainer","state":"pending"};
}
