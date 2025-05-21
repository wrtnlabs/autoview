
import Component from "../components/160";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"parent":null,"children":[{"id":"11111111-2222-3333-4444-555555555555","code":"FOOD","parent_id":"b0a1c2d3-4e5f-6789-0abc-def123456789","name":"Food (Sample)","created_at":"2025-05-19T08:00:00Z","children":[{"id":"66666666-7777-8888-9999-000000000000","code":"MEAT","parent_id":"11111111-2222-3333-4444-555555555555","name":"Meat (Sample)","created_at":"2025-05-19T08:05:00Z","children":[{"id":"aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee","code":"FROZEN","parent_id":"66666666-7777-8888-9999-000000000000","name":"Frozen food (Sample)","created_at":"2025-05-19T08:10:00Z","children":[]}]}]},{"id":"123e4567-e89b-12d3-a456-426614174000","code":"ELEC","parent_id":"b0a1c2d3-4e5f-6789-0abc-def123456789","name":"Electronics (Sample)","created_at":"2025-05-19T08:15:00Z","children":[{"id":"223e4567-e89b-12d3-a456-426614174001","code":"LAPTOP","parent_id":"123e4567-e89b-12d3-a456-426614174000","name":"Notebook Series (Sample)","created_at":"2025-05-19T08:20:00Z","children":[{"id":"323e4567-e89b-12d3-a456-426614174002","code":"15IN","parent_id":"223e4567-e89b-12d3-a456-426614174001","name":"15 inch Models (Sample)","created_at":"2025-05-19T08:25:00Z","children":[]}]}]}],"id":"b0a1c2d3-4e5f-6789-0abc-def123456789","code":"CAT_ROOT","parent_id":null,"name":"All Categories (Test)","created_at":"2025-05-19T07:55:00Z"};
}
