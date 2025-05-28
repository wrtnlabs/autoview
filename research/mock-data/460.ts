
import Component from "../components/460";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_request_count":12500,"rate_limited_request_count":250};
}
