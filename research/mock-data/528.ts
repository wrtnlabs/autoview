
import Component from "../components/528";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"nc-001-sample","name":"Sample Network Configuration (Test)","compute_service":"codespaces","network_settings_ids":["ns-1001-sample","ns-1002-sample","ns-1003-sample"],"created_on":"2025-06-01T12:00:00Z"};
}
