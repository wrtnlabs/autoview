
import Component from "../components/281";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"result":true,"code":1000,"requestToResponse":"req-abc123-sample","data":{"list":[{"id":1,"userId":101,"resourceName":"SampleResource (Test)","resourceId":555,"redirectLink":1001},{"id":2,"userId":202}],"count":2,"totalResult":50,"totalPage":5,"search":"alarm_search_term_sample","page":1}};
}
