
import Component from "../components/527";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"network_configurations":[{"id":"net-config-001-sample","name":"Sample Network Config 1 (Test)","compute_service":"actions","network_settings_ids":["ns-1001-sample","ns-1002-sample"],"created_on":"2025-05-19T12:00:00Z"},{"id":"net-config-002-sample","name":"Sample Network Config 2 (Test)","created_on":null}]};
}
