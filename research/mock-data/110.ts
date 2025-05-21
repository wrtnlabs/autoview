
import Component from "../components/110";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"parent":{"parent":null,"id":"1001","code":"ROOT_TEST","parent_id":null,"name":"Root Category (Sample)","created_at":"2025-05-18T09:00:00Z"},"id":"2002","code":"ELEC_TEST","parent_id":"123e4567-e89b-12d3-a456-426614174000","name":"Electronics (Sample)","created_at":"2025-05-19T14:30:00Z"};
}
