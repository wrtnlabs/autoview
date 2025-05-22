
import Component from "../components/466";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"actor_type":"User","actor_name":"Sample User (Test)","actor_id":1001,"integration_id":2001,"oauth_application_id":3001,"total_request_count":1500,"rate_limited_request_count":2,"last_rate_limited_timestamp":"2025-05-18T22:15:30Z","last_request_timestamp":"2025-05-19T14:30:00Z"},{"actor_id":1003,"integration_id":null,"oauth_application_id":null,"total_request_count":50,"rate_limited_request_count":0,"last_rate_limited_timestamp":null,"last_request_timestamp":"2025-05-19T09:15:45Z"}];
}
