
import Component from "../components/293";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"result":true,"code":1000,"requestToResponse":"req_12345_to_resp_67890_test","data":{"list":[{"name":"UI Design (Test)","id":101},{"name":"Graphic Design (Sample)","id":102}],"count":2,"totalResult":50,"totalPage":5,"search":"design","page":1}};
}
