
import Component from "../components/463";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"timestamp":"2025-05-19T10:00:00Z","total_request_count":12000,"rate_limited_request_count":45},{"timestamp":"2025-05-19T11:00:00Z","total_request_count":13500},{"total_request_count":9800,"rate_limited_request_count":10},{"timestamp":"2025-05-19T12:00:00Z"}];
}
