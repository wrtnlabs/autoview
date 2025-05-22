
import Component from "../components/920";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"url":"https://api.example.com/v2/test-team/memberships/67890","role":"maintainer","state":"active"};
}
