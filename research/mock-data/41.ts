
import Component from "../components/41";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"parent":{"parent":null,"id":"cat-001","code":"ELEC_TEST","parent_id":null,"name":"Electronics (Sample)","created_at":"2025-05-18T10:00:00Z"},"id":"cat-002","code":"HOME_APPLIANCE_TEST","parent_id":"550e8400-e29b-41d4-a716-446655440000","name":"Home Appliances (Sample)","created_at":"2025-05-19T14:30:00Z"};
}
