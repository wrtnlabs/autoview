
import Component from "../components/458";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"http_method":"GET","api_route":"/api/v1/users","total_request_count":1500,"rate_limited_request_count":5,"last_rate_limited_timestamp":"2025-05-19T12:45:30Z","last_request_timestamp":"2025-05-19T13:00:00Z"},{"http_method":"POST","api_route":"/api/v1/orders","total_request_count":500,"rate_limited_request_count":0,"last_rate_limited_timestamp":null,"last_request_timestamp":"2025-05-19T14:15:00Z"},{"http_method":"PATCH","api_route":"/api/v1/products/12345","total_request_count":300,"last_request_timestamp":"2025-05-19T15:20:00Z"}];
}
