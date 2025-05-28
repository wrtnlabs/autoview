
import Component from "../components/283";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"result":true,"code":1000,"requestToResponse":"Sample request-to-response mapping (Test)","data":true};
}
