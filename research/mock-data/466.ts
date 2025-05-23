
import Component from "../components/466";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"actor_type":"User","actor_name":"Sample User (Test)","actor_id":1024,"integration_id":2048,"oauth_application_id":null,"total_request_count":15000,"rate_limited_request_count":123,"last_rate_limited_timestamp":"2025-05-18T09:00:00Z","last_request_timestamp":"2025-05-19T12:45:30Z"},{"actor_type":"System","actor_name":"Test Automation (Sample)","actor_id":2048,"integration_id":null,"oauth_application_id":4096,"total_request_count":5000,"rate_limited_request_count":0,"last_rate_limited_timestamp":null,"last_request_timestamp":"2025-05-19T08:15:00Z"}];
}
