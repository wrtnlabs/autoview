
import Component from "../components/465";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"timestamp":"2025-05-19T00:00:00Z","total_request_count":1200,"rate_limited_request_count":25},{"timestamp":"2025-05-19T01:00:00Z","total_request_count":1350},{"timestamp":"2025-05-19T02:00:00Z","rate_limited_request_count":10},{}];
}
