
import Component from "../components/459";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"subject_type":"user","subject_name":"Sample User (Test)","subject_id":1001,"total_request_count":15234,"rate_limited_request_count":27,"last_rate_limited_timestamp":"2025-05-18T22:15:00Z","last_request_timestamp":"2025-05-19T12:45:30Z"},{"subject_type":"project","subject_name":"Project Alpha (Sample)","subject_id":2002,"total_request_count":7834,"rate_limited_request_count":0,"last_rate_limited_timestamp":null,"last_request_timestamp":"2025-05-19T13:10:45Z"}];
}
