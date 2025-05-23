
import Component from "../components/462";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_request_count":15750,"rate_limited_request_count":240};
}
