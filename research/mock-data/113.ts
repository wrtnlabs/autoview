
import Component from "../components/113";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"55555555-5555-4555-8555-555555555555","created_at":"2025-05-18T12:00:00Z","code":"online_store","name":"Online Store (Test)","categories":[{"id":"11111111-1111-4111-8111-111111111111","created_at":"2025-05-19T08:00:00Z","code":"electronics","name":"Electronics (Test)","parent_id":null,"children":[{"id":"22222222-2222-4222-8222-222222222222","created_at":"2025-05-19T08:30:00Z","code":"mobile","name":"Mobile Phones (Sample)","parent_id":"11111111-1111-4111-8111-111111111111","children":[{"id":"33333333-3333-4333-8333-333333333333","created_at":"2025-05-19T08:45:00Z","code":"smartphone","name":"Smartphones (Dummy)","parent_id":"22222222-2222-4222-8222-222222222222","children":[]}]}]},{"id":"44444444-4444-4444-8444-444444444444","created_at":"2025-05-19T09:00:00Z","code":"home_kitchen","name":"Home & Kitchen (Test)","parent_id":null,"children":[]}]};
}
