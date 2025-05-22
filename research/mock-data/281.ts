
import Component from "../components/281";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"result":true,"code":1000,"requestToResponse":"req-12345-response-sample","data":{"list":[{"id":101,"userId":1001,"resourceName":"DummyResource_Test","resourceId":2001,"redirectLink":550},{"id":102,"userId":1002}],"count":2,"totalResult":50,"totalPage":25,"search":"alarm_filter_test","page":1}};
}
