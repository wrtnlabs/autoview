
import Component from "../components/528";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"nc_12345_test","name":"Test Network Configuration (Sample)","compute_service":"codespaces","network_settings_ids":["ns-001-sample","ns-002-sample"],"created_on":"2025-06-15T14:45:30Z"};
}
