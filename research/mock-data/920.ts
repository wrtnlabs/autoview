
import Component from "../components/920";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"url":"https://api.example.com/teams/1234/memberships/test-user-sample","role":"member","state":"active"};
}
