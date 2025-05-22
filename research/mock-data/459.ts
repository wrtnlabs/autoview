
import Component from "../components/459";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"subject_type":"User (Test Account)","subject_name":"Test User API Key (Sample)","subject_id":1001,"total_request_count":250,"rate_limited_request_count":5,"last_rate_limited_timestamp":"2025-05-19T13:50:00Z","last_request_timestamp":"2025-05-19T14:00:00Z"},{"subject_type":"Service (Sample)","subject_name":"Sample Internal Service","subject_id":2002,"total_request_count":1024,"rate_limited_request_count":0,"last_rate_limited_timestamp":null,"last_request_timestamp":"2025-05-19T13:59:59Z"},{"subject_type":"Application (Sample)","subject_id":3003,"total_request_count":5000,"last_request_timestamp":"2025-05-18T08:30:00Z"}];
}
