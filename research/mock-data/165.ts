
import Component from "../components/165";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa","created_at":"2025-05-19T09:00:00Z","code":"SHOP_CH_001","name":"Sample Shopping Channel (Test)","categories":[{"id":"22222222-2222-2222-2222-222222222222","parent_id":null,"code":"ELEC","name":"Electronics (Sample)","created_at":"2025-05-19T12:05:00Z","children":[{"id":"33333333-3333-3333-3333-333333333333","parent_id":"22222222-2222-2222-2222-222222222222","code":"PHONES","name":"Mobile Phones (Test)","created_at":"2025-05-19T12:10:00Z","children":[]},{"id":"44444444-4444-4444-4444-444444444444","parent_id":"22222222-2222-2222-2222-222222222222","code":"LAPTOPS","name":"Laptops (Sample)","created_at":"2025-05-19T12:15:00Z","children":[]}]},{"id":"55555555-5555-5555-5555-555555555555","parent_id":null,"code":"CLOTH","name":"Clothing (Sample)","created_at":"2025-05-19T12:20:00Z","children":[{"id":"66666666-6666-6666-6666-666666666666","parent_id":"55555555-5555-5555-5555-555555555555","code":"MEN","name":"Men's Apparel (Test)","created_at":"2025-05-19T12:25:00Z","children":[{"id":"77777777-7777-7777-7777-777777777777","parent_id":"66666666-6666-6666-6666-666666666666","code":"TSHIRT","name":"T-Shirts (Sample)","created_at":"2025-05-19T12:30:00Z","children":[]}]}]}]};
}
