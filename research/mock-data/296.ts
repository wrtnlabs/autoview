
import Component from "../components/296";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"result":true,"code":1000,"requestToResponse":"Sample request-to-response mapping (Test UI)","data":["sample_item_01","sample_item_02","sample_item_03"]};
}
