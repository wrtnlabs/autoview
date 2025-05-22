
import Component from "../components/465";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"timestamp":"2025-05-16T00:00:00Z","total_request_count":1500,"rate_limited_request_count":15},{"total_request_count":1800,"rate_limited_request_count":20},{"timestamp":"2025-05-18T00:00:00Z","total_request_count":2100},{"timestamp":"2025-05-19T00:00:00Z","rate_limited_request_count":5}];
}
