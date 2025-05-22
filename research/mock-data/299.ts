
import Component from "../components/299";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"result":true,"code":1000,"requestToResponse":"req_12345_test -> res_67890_sample","data":{"question":12,"answer":30,"adopted":7,"writing":15,"likes":85,"id":98765}};
}
