
import Component from "../components/114";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"abcd1234-ef56-7890-abcd-ef1234567890","created_at":"2025-05-19T08:00:00Z","code":"SHOP_CHNL_SAMPLE","name":"Sample Shopping Channel (Test)","categories":[{"id":"11111111-aaaa-bbbb-cccc-111111111111","created_at":"2025-05-19T09:05:00Z","code":"ELEC","name":"Electronics (Test)","parent_id":null,"children":[{"id":"22222222-aaaa-bbbb-cccc-222222222222","created_at":"2025-05-19T09:10:00Z","code":"MOBILE","name":"Mobile Phones (Sample)","parent_id":"11111111-aaaa-bbbb-cccc-111111111111","children":[]}]},{"id":"33333333-aaaa-bbbb-cccc-333333333333","created_at":"2025-05-19T09:05:30Z","code":"HOME","name":"Home Appliances (Test)","parent_id":null,"children":[{"id":"44444444-aaaa-bbbb-cccc-444444444444","created_at":"2025-05-19T09:15:00Z","code":"KITCHEN","name":"Kitchen Essentials (Sample)","parent_id":"33333333-aaaa-bbbb-cccc-333333333333","children":[]},{"id":"55555555-aaaa-bbbb-cccc-555555555555","created_at":"2025-05-19T09:16:00Z","code":"CLEAN","name":"Cleaning Supplies (Test)","parent_id":"33333333-aaaa-bbbb-cccc-333333333333","children":[]}]}]};
}
