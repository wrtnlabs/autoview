
import Component from "../components/299";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"result":true,"code":1000,"requestToResponse":"req-98765-response-sample","data":{"question":8,"answer":15,"adopted":4,"writing":5,"likes":27,"id":98765}};
}
