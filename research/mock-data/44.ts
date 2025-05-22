
import Component from "../components/44";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"e7f3a1c2-d4b5-4a6f-8b9c-001122334455","code":"ONLINE_STORE","name":"Online Store (Sample)","created_at":"2025-06-01T12:00:00Z","categories":[{"id":"0f1e2d3c-4b5a-6978-9c0d-1234567890ab","code":"ELEC","name":"Electronics (Sample)","created_at":"2025-06-01T12:10:00Z","parent_id":null,"children":[{"id":"1a2b3c4d-5e6f-7081-9283-abcdef123456","code":"COMP","name":"Computers (Sample)","created_at":"2025-06-01T12:15:00Z","parent_id":"0f1e2d3c-4b5a-6978-9c0d-1234567890ab","children":[]},{"id":"2b3c4d5e-6f70-8192-83ab-cedf78901234","code":"MOB","name":"Mobile Devices (Sample)","created_at":"2025-06-01T12:20:00Z","parent_id":"0f1e2d3c-4b5a-6978-9c0d-1234567890ab","children":[]}]},{"id":"5d6e7f8a-9b0c-1d2e-3f4a-567890abcdef","code":"APPAREL","name":"Apparel (Sample)","created_at":"2025-06-01T12:05:00Z","parent_id":null,"children":[{"id":"6e7f8a9b-0c1d-2e3f-4a5b-67890abcdef1","code":"MEN","name":"Men's Clothing (Sample)","created_at":"2025-06-01T12:25:00Z","parent_id":"5d6e7f8a-9b0c-1d2e-3f4a-567890abcdef","children":[]},{"id":"7f8a9b0c-1d2e-3f4a-5b6c-7890abcdef12","code":"WOM","name":"Women's Clothing (Sample)","created_at":"2025-06-01T12:30:00Z","parent_id":"5d6e7f8a-9b0c-1d2e-3f4a-567890abcdef","children":[]}]}]};
}
