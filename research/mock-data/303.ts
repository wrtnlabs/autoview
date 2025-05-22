
import Component from "../components/303";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"result":true,"code":1000,"requestToResponse":"req-12345_sample -> resp-67890_sample","data":true};
}
