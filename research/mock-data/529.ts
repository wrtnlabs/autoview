
import Component from "../components/529";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"netconf_dummy_123","name":"Sample Network Configuration (Test)","compute_service":"codespaces","network_settings_ids":["netset_001","netset_002","netset_003"],"created_on":"2025-05-19T14:30:00Z"};
}
