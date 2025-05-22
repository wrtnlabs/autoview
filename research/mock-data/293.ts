
import Component from "../components/293";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"result":true,"code":1000,"requestToResponse":"req_1609459200_response","data":{"list":[{"id":1,"name":"UI Design (Sample)"},{"id":2,"name":"Graphic Design (Test)"},{"id":3,"name":"Interaction Design (Demo)"}],"count":3,"totalResult":12,"totalPage":4,"search":"design","page":1}};
}
