
import Component from "../components/303";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"result":true,"code":1000,"requestToResponse":"Processed request successfully (Test)","data":true};
}
