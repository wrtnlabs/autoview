
import Component from "../components/383";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":3,"platforms":["ubuntu-latest","windows-latest","macos-latest"]};
}
