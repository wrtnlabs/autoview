
import Component from "../components/164";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"categories":[{"children":[{"children":[],"id":"22222222-2222-2222-2222-222222222222","code":"mobile_phones","parent_id":"11111111-1111-1111-1111-111111111111","name":"Mobile Phones (Sample)","created_at":"2025-05-19T09:15:00Z"},{"children":[{"children":[],"id":"44444444-4444-4444-4444-444444444444","code":"gaming_laptops","parent_id":"33333333-3333-3333-3333-333333333333","name":"Gaming Laptops (Sample)","created_at":"2025-05-19T09:30:00Z"}],"id":"33333333-3333-3333-3333-333333333333","code":"laptops","parent_id":"11111111-1111-1111-1111-111111111111","name":"Laptops (Sample)","created_at":"2025-05-19T09:20:00Z"}],"id":"11111111-1111-1111-1111-111111111111","code":"electronics","parent_id":null,"name":"Electronics (Sample)","created_at":"2025-05-19T09:00:00Z"},{"children":[{"children":[],"id":"66666666-6666-6666-6666-666666666666","code":"mens_wear","parent_id":"55555555-5555-5555-5555-555555555555","name":"Men's Wear (Sample)","created_at":"2025-05-19T10:15:00Z"}],"id":"55555555-5555-5555-5555-555555555555","code":"apparel","parent_id":null,"name":"Apparel (Sample)","created_at":"2025-05-19T10:00:00Z"}],"id":"77777777-7777-7777-7777-777777777777","created_at":"2025-05-19T08:30:00Z","code":"SHOP_CHANNEL_SAMPLE","name":"Sample Shopping Channel (Test)"};
}
