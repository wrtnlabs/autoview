
import Component from "../components/464";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"timestamp":"2025-05-19T00:00:00Z","total_request_count":12034,"rate_limited_request_count":123},{"timestamp":"2025-05-19T01:00:00Z","total_request_count":13450,"rate_limited_request_count":0},{"timestamp":"2025-05-19T02:00:00Z","total_request_count":15000},{"total_request_count":16000,"rate_limited_request_count":200}];
}
