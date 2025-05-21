
import Component from "../components/530";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"netcfg-sample-001","name":"Test Network Configuration (Sample)","compute_service":"codespaces","network_settings_ids":["ns-settings-001-sample","ns-settings-002-sample"],"created_on":"2025-05-19T14:30:00Z"};
}
