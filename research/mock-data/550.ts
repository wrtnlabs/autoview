
import Component from "../components/550";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"url":"https://api.example.com/teams/sample-team-01/memberships/test-user-123","role":"member","state":"active"};
}
