
import Component from "../components/164";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"categories":[{"id":"a1e9fdd1-2b7c-4f90-9d17-123456abcdef","code":"ELEC","name":"Electronics","created_at":"2025-05-01T09:00:00Z","parent_id":null,"children":[{"id":"b2f6c3e4-8a5d-4c21-9e17-abcdef123456","code":"PHONES","name":"Mobile Phones","created_at":"2025-05-02T10:00:00Z","parent_id":"a1e9fdd1-2b7c-4f90-9d17-123456abcdef","children":[{"id":"c3a5d6e7-9b1f-4a23-8f34-fedcba654321","code":"SMART","name":"Smartphones","created_at":"2025-05-03T11:00:00Z","parent_id":"b2f6c3e4-8a5d-4c21-9e17-abcdef123456","children":[]}]},{"id":"d4b8c9f0-1e2d-4f34-8e56-654321fedcba","code":"COMP","name":"Computers","created_at":"2025-05-02T10:30:00Z","parent_id":"a1e9fdd1-2b7c-4f90-9d17-123456abcdef","children":[]}]},{"id":"e5c7d8f1-3f4a-4b56-9c78-1928374650ab","code":"HOME","name":"Home & Kitchen","created_at":"2025-05-01T09:30:00Z","parent_id":null,"children":[{"id":"f6d8e9a2-4b5c-4d67-9d89-abcdef098765","code":"FURN","name":"Furniture","created_at":"2025-05-02T11:00:00Z","parent_id":"e5c7d8f1-3f4a-4b56-9c78-1928374650ab","children":[]}]}],"id":"521e210e-0f9a-4fdc-b514-3d5f6e7890ab","created_at":"2025-05-19T14:30:00Z","code":"SC-001","name":"Sample Shopping Channel (Test)"};
}
