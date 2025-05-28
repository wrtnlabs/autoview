
import Component from "../components/293";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"result":true,"code":1000,"requestToResponse":"req-abc123_sample","data":{"list":[{"id":1,"name":"Graphic Design (Sample)"},{"id":2,"name":"UI/UX Design (Test)"},{"id":3,"name":"Illustration Dummy"}],"count":3,"totalResult":9,"totalPage":3,"search":"design","page":1}};
}
