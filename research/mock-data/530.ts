
import Component from "../components/530";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"net-config-sample-001","name":"Test Compute Network Configuration (Sample)","compute_service":"codespaces","network_settings_ids":["nsid-sample-001","nsid-sample-002"],"created_on":"2025-05-19T09:15:00Z"};
}
