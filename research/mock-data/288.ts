
import Component from "../components/288";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"result":true,"code":1000,"requestToResponse":"req_12345 -> resp_67890 (Sample)","data":true};
}
