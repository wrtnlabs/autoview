
import Component from "../components/46";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"b1e4c1d2-3f4a-5b6c-7d8e-9f0123456789","code":"SHOP_CH_01","name":"Online Shop (Sample)","created_at":"2025-05-19T14:30:00Z","categories":[{"id":"c0a80100-0000-0000-0000-000000000001","code":"ELEC","parent_id":null,"name":"Electronics (Sample)","created_at":"2025-05-19T10:00:00Z","children":[{"id":"c0a80100-0000-0000-0000-000000000002","code":"PHONE","parent_id":"c0a80100-0000-0000-0000-000000000001","name":"Mobile Phones (Sample)","created_at":"2025-05-19T11:00:00Z","children":[]},{"id":"c0a80100-0000-0000-0000-000000000003","code":"COMP","parent_id":"c0a80100-0000-0000-0000-000000000001","name":"Computers & Tablets (Sample)","created_at":"2025-05-19T11:05:00Z","children":[]}]},{"id":"c0a80100-0000-0000-0000-000000000010","code":"CLOTH","parent_id":null,"name":"Clothing (Sample)","created_at":"2025-05-19T10:05:00Z","children":[{"id":"c0a80100-0000-0000-0000-000000000011","code":"MEN","parent_id":"c0a80100-0000-0000-0000-000000000010","name":"Men's Clothing (Sample)","created_at":"2025-05-19T11:10:00Z","children":[]},{"id":"c0a80100-0000-0000-0000-000000000012","code":"WOMEN","parent_id":"c0a80100-0000-0000-0000-000000000010","name":"Women's Clothing (Sample)","created_at":"2025-05-19T11:15:00Z","children":[]}]}]};
}
