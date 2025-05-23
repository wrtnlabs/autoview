
import Component from "../components/458";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"http_method":"GET","api_route":"/api/v1/users/{userId}/insights","total_request_count":1500,"rate_limited_request_count":30,"last_rate_limited_timestamp":"2025-05-19T09:45:00Z","last_request_timestamp":"2025-05-19T10:00:00Z"},{"http_method":"POST","api_route":"/api/v1/orders/{orderId}/create","total_request_count":750,"rate_limited_request_count":0,"last_rate_limited_timestamp":null,"last_request_timestamp":"2025-05-19T11:15:30Z"}];
}
