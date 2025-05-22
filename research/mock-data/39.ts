
import Component from "../components/39";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":"c1a2b3c4-d5e6-7f8a-9b0c-d1e2f3a4b5c6","code":"ELEC_DEVICES","parent_id":null,"name":"Electronics (Test)","created_at":"2025-05-19T07:30:00Z","children":[{"id":"f1e2d3c4-b5a6-7f8e-9d0c-e1f2a3b4c5d6","code":"MOBILE_PHONES","parent_id":"c1a2b3c4-d5e6-7f8a-9b0c-d1e2f3a4b5c6","name":"Mobile Phones (Sample)","created_at":"2025-05-19T08:15:00Z","children":[{"id":"a1b2c3d4-e5f6-7a8b-9c0d-e1f2a3b4c5d7","code":"SMARTPHONES","parent_id":"f1e2d3c4-b5a6-7f8e-9d0c-e1f2a3b4c5d6","name":"Smartphones (Test)","created_at":"2025-05-19T09:00:00Z","children":[]}]},{"id":"d4c3b2a1-f6e5-8b7a-0c9d-e2f3a4b5c6d8","code":"LAPTOPS","parent_id":"c1a2b3c4-d5e6-7f8a-9b0c-d1e2f3a4b5c6","name":"Laptops (Sample)","created_at":"2025-05-19T08:45:00Z","children":[]}]},{"id":"123e4567-e89b-12d3-a456-426614174000","code":"HOME_KITCHEN","parent_id":null,"name":"Home & Kitchen (Sample)","created_at":"2025-05-18T10:00:00Z","children":[{"id":"223e4567-e89b-12d3-a456-426614174001","code":"KITCHEN_APPLIANCES","parent_id":"123e4567-e89b-12d3-a456-426614174000","name":"Kitchen Appliances (Test)","created_at":"2025-05-18T10:30:00Z","children":[]},{"id":"323e4567-e89b-12d3-a456-426614174002","code":"FURNITURE","parent_id":"123e4567-e89b-12d3-a456-426614174000","name":"Furniture (Sample)","created_at":"2025-05-18T11:00:00Z","children":[]}]}];
}
