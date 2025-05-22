
import Component from "../components/527";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"network_configurations":[{"id":"netcfg-001-sample","name":"Test Network Configuration Alpha (Sample)","compute_service":"actions","network_settings_ids":["ns-101-sample","ns-102-sample"],"created_on":"2025-05-19T14:30:00Z"},{"id":"netcfg-002-sample","name":"Test Network Configuration Beta (Sample)","network_settings_ids":["ns-201-sample"],"created_on":null}]};
}
