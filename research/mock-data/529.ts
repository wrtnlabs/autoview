
import Component from "../components/529";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"net-config-sample-001","name":"Sample Network Configuration (Test)","compute_service":"codespaces","network_settings_ids":["ns-001-sample","ns-002-sample"],"created_on":"2025-05-19T12:00:00Z"};
}
