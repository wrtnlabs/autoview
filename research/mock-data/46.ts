
import Component from "../components/46";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa","created_at":"2025-05-15T08:00:00Z","code":"SHOP_CHANNEL_001","name":"Main Shopping Channel (Sample)","categories":[{"id":"11111111-1111-1111-1111-111111111111","code":"CAT_ELECTRONICS","parent_id":null,"name":"Electronics (Test)","created_at":"2025-05-01T09:15:00Z","children":[{"id":"22222222-2222-2222-2222-222222222222","code":"CAT_SMARTPHONES","parent_id":"11111111-1111-1111-1111-111111111111","name":"Smartphones (Sample)","created_at":"2025-05-02T10:00:00Z","children":[]},{"id":"33333333-3333-3333-3333-333333333333","code":"CAT_LAPTOPS","parent_id":"11111111-1111-1111-1111-111111111111","name":"Laptops (Dummy)","created_at":"2025-05-02T10:30:00Z","children":[{"id":"44444444-4444-4444-4444-444444444444","code":"CAT_ULTRABOOKS","parent_id":"33333333-3333-3333-3333-333333333333","name":"Ultrabooks (Test)","created_at":"2025-05-03T08:00:00Z","children":[]}]}]},{"id":"55555555-5555-5555-5555-555555555555","code":"CAT_HOME_APPLIANCES","parent_id":null,"name":"Home Appliances (Test)","created_at":"2025-04-25T11:20:00Z","children":[]}]};
}
