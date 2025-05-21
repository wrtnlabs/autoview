
import Component from "../components/114";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"categories":[{"children":[{"children":[],"id":"22222222-2222-2222-2222-222222222222","code":"ELEC-MOB","parent_id":"11111111-1111-1111-1111-111111111111","name":"Mobile Phones (Test)","created_at":"2025-05-19T12:02:00Z"},{"children":[],"id":"33333333-3333-3333-3333-333333333333","code":"ELEC-LAP","parent_id":"11111111-1111-1111-1111-111111111111","name":"Laptops (Sample)","created_at":"2025-05-19T12:03:00Z"}],"id":"11111111-1111-1111-1111-111111111111","code":"ELEC","parent_id":null,"name":"Electronics (Sample)","created_at":"2025-05-19T12:01:00Z"},{"children":[{"children":[{"children":[],"id":"66666666-6666-6666-6666-666666666666","code":"HOME-KITCH-SMALL","parent_id":"55555555-5555-5555-5555-555555555555","name":"Small Kitchen Appliances (Test)","created_at":"2025-05-19T12:06:00Z"}],"id":"55555555-5555-5555-5555-555555555555","code":"HOME-KITCH","parent_id":"44444444-4444-4444-4444-444444444444","name":"Kitchen Appliances (Sample)","created_at":"2025-05-19T12:05:00Z"}],"id":"44444444-4444-4444-4444-444444444444","code":"HOME","parent_id":null,"name":"Home & Kitchen (Test)","created_at":"2025-05-19T12:04:00Z"}],"id":"550e8400-e29b-41d4-a716-446655440000","created_at":"2025-05-19T12:00:00Z","code":"ONLINE_STORE_TEST","name":"Sample Online Store (Test)"};
}
