
import Component from "../components/461";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_request_count":15000,"rate_limited_request_count":320};
}
