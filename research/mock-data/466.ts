
import Component from "../components/466";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"actor_type":"user","actor_name":"Test User (Dev)","actor_id":1001,"integration_id":null,"oauth_application_id":2002,"total_request_count":1500,"rate_limited_request_count":5,"last_rate_limited_timestamp":"2025-05-19T13:45:00Z","last_request_timestamp":"2025-05-19T14:00:00Z"},{"actor_type":"integration","actor_id":3003,"integration_id":4004,"total_request_count":300,"last_request_timestamp":"2025-05-18T09:15:30Z"}];
}
