
import Component from "../components/113";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"categories":[{"id":"a1e3c9f2-5b4d-4afe-9c3f-2bbf0c8a8e77","code":"ELEC_TEST","name":"Electronics (Test)","created_at":"2025-05-19T14:31:00Z","parent_id":null,"children":[{"id":"b2a4d9c8-3f1e-42d3-b4a2-1f6c9e7d8f0a","code":"MOB_TEST","name":"Mobile Phones (Test)","created_at":"2025-05-19T14:32:00Z","parent_id":"a1e3c9f2-5b4d-4afe-9c3f-2bbf0c8a8e77","children":[]},{"id":"c3f5e7b6-6d4c-4bcf-8a9f-3f3de9c8b7a6","code":"LAP_TEST","name":"Laptops (Test)","created_at":"2025-05-19T14:33:00Z","parent_id":"a1e3c9f2-5b4d-4afe-9c3f-2bbf0c8a8e77","children":[]}]},{"id":"d4f7b2e1-8a3c-4d2f-9b6e-4a7f3b2d5c6e","code":"HOME_APP_TEST","name":"Home Appliances (Test)","created_at":"2025-05-19T14:35:00Z","parent_id":null,"children":[{"id":"e5c8d7f6-9b2a-4c1e-8d7f-5b6a9c3d2e1f","code":"KIT_TEST","name":"Kitchenware (Test)","created_at":"2025-05-19T14:36:00Z","parent_id":"d4f7b2e1-8a3c-4d2f-9b6e-4a7f3b2d5c6e","children":[{"id":"f6a9c3d2-1e2f-4b6c-8d7e-9a3b5c2d4e1f","code":"MICRO_TEST","name":"Microwaves (Test)","created_at":"2025-05-19T14:37:00Z","parent_id":"e5c8d7f6-9b2a-4c1e-8d7f-5b6a9c3d2e1f","children":[]}]}]}],"id":"c9d8b7e6-5a4f-4d3c-8b2a-1f0e9d8c7b6a","created_at":"2025-05-19T14:30:00Z","code":"ONL_MKT_TEST","name":"Online Market (Test)"};
}
