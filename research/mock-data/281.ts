
import Component from "../components/281";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"result":true,"code":1000,"requestToResponse":"req_12345 -> res_12345 (Sample)","data":{"list":[{"id":1,"userId":101,"resourceName":"SampleResourceAlpha (Test)","resourceId":5001,"redirectLink":3001},{"id":2,"userId":102,"resourceName":"SystemMonitor (Sample)","redirectLink":3002}],"count":2,"totalResult":50,"totalPage":5,"search":"Error alarms (Test)","page":1}};
}
