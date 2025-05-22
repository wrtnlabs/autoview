
import Component from "../components/529";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"netcfg_test_001","name":"Sample Network Configuration (Test)","compute_service":"codespaces","network_settings_ids":["ns-sample-001","ns-sample-002","ns-sample-003"],"created_on":"2025-05-19T14:30:00Z"};
}
