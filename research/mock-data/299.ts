
import Component from "../components/299";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"result":true,"code":1000,"requestToResponse":"request_ABC123 -> response_XYZ789 (Test)","data":{"question":125,"answer":95,"adopted":60,"writing":30,"likes":220,"id":1001}};
}
