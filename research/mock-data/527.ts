
import Component from "../components/527";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"network_configurations":[{"id":"netcfg-001-sample","name":"Sample Network Configuration A","compute_service":"actions","network_settings_ids":["nsid-1001-sample","nsid-1002-sample"],"created_on":"2025-05-19T09:00:00Z"},{"id":"netcfg-002-sample","name":"Test Network Configuration B","compute_service":"none","created_on":null}]};
}
