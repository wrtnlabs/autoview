
import Component from "../components/39";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":"11111111-1111-1111-1111-111111111111","code":"ELEC","parent_id":null,"name":"Electronics (Test)","created_at":"2025-05-18T08:00:00Z","children":[{"id":"22222222-2222-2222-2222-222222222222","code":"ELEC_MOB","parent_id":"11111111-1111-1111-1111-111111111111","name":"Mobile Phones (Sample)","created_at":"2025-05-18T09:00:00Z","children":[]},{"id":"33333333-3333-3333-3333-333333333333","code":"ELEC_COMP","parent_id":"11111111-1111-1111-1111-111111111111","name":"Computers & Tablets (Dummy)","created_at":"2025-05-18T09:30:00Z","children":[{"id":"44444444-4444-4444-4444-444444444444","code":"ELEC_COMP_LAP","parent_id":"33333333-3333-3333-3333-333333333333","name":"Laptops (Test)","created_at":"2025-05-18T10:00:00Z","children":[]}]}]},{"id":"55555555-5555-5555-5555-555555555555","code":"BOOKS","parent_id":null,"name":"Books & Magazines (Sample)","created_at":"2025-05-19T11:15:00Z","children":[{"id":"66666666-6666-6666-6666-666666666666","code":"BOOKS_FIC","parent_id":"55555555-5555-5555-5555-555555555555","name":"Fiction (Test)","created_at":"2025-05-19T11:45:00Z","children":[]}]}];
}
