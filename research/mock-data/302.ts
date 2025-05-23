
import Component from "../components/302";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"result":true,"code":1000,"requestToResponse":"sample_request_id_5678","data":true};
}
