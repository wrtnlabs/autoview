
import Component from "../components/463";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"timestamp":"2025-05-19T00:00:00Z","total_request_count":1500,"rate_limited_request_count":5},{"timestamp":"2025-05-19T01:00:00Z","total_request_count":2000,"rate_limited_request_count":0},{"timestamp":"2025-05-19T02:00:00Z","total_request_count":1800},{"timestamp":"2025-05-19T03:00:00Z","rate_limited_request_count":3},{}];
}
