
import Component from "../components/110";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"parent":{"parent":null,"id":"11111111-1111-1111-1111-111111111111","code":"ROOT_CAT_TEST","parent_id":null,"name":"Root Category (Sample)","created_at":"2025-05-19T08:00:00Z"},"id":"22222222-2222-2222-2222-222222222222","code":"ELEC_TEST","parent_id":"11111111-1111-1111-1111-111111111111","name":"Electronics (Test Category)","created_at":"2025-05-19T12:00:00Z"};
}
