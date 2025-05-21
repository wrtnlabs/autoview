
import Component from "../components/528";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"netcfg_sample_001","name":"Sample Network Configuration (Test)","compute_service":"codespaces","network_settings_ids":["ns_config_sample_001","ns_config_sample_002"],"created_on":"2025-05-19T08:30:00Z"};
}
