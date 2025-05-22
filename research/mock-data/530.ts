
import Component from "../components/530";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"netconfig_sample_001","name":"Test Network Configuration (Sample)","compute_service":"codespaces","network_settings_ids":["ns_sample_001","ns_sample_002"],"created_on":"2025-05-19T12:00:00Z"};
}
