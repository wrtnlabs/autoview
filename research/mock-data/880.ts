
import Component from "../components/880";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"days":[1,0,2,1,3,0,4],"total":11,"week":1715548800},{"days":[0,1,0,0,2,1,0],"total":4,"week":1716153600},{"days":[5,3,2,4,1,0,0],"total":15,"week":1716758400}];
}
