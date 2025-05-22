
import Component from "../components/458";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"http_method":"GET","api_route":"/api/v1/users","total_request_count":1200,"rate_limited_request_count":15,"last_rate_limited_timestamp":"2025-05-19T13:45:30Z","last_request_timestamp":"2025-05-19T14:00:00Z"},{"http_method":"POST","api_route":"/api/v1/orders","total_request_count":300,"rate_limited_request_count":0,"last_rate_limited_timestamp":null,"last_request_timestamp":"2025-05-19T14:05:10Z"},{"total_request_count":50,"rate_limited_request_count":5,"last_rate_limited_timestamp":"2025-05-19T12:30:00Z","last_request_timestamp":"2025-05-19T12:45:00Z"}];
}
