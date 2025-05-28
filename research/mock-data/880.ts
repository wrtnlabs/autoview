
import Component from "../components/880";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"days":[1,3,2,0,1,4,2],"total":13,"week":1746422400},{"days":[0,2,1,3,0,2,1],"total":9,"week":1747027200},{"days":[2,2,2,2,2,2,2],"total":14,"week":1747632000}];
}
