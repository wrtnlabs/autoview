
import Component from "../components/880";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"days":[0,2,5,3,1,0,0],"total":11,"week":1705065600},{"days":[1,0,0,4,2,3,0],"total":10,"week":1705670400}];
}
