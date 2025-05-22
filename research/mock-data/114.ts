
import Component from "../components/114";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"categories":[{"children":[{"children":[],"id":"c550e8400-e29b-41d4-a716-446655440001","code":"ELEC_COMPUTERS","parent_id":"550e8400-e29b-41d4-a716-446655440000","name":"Computers & Accessories (Demo)","created_at":"2025-05-19T09:15:00Z"},{"children":[],"id":"c550e8400-e29b-41d4-a716-446655440002","code":"ELEC_PHONES","parent_id":"550e8400-e29b-41d4-a716-446655440000","name":"Mobile Phones (Test)","created_at":"2025-05-19T09:17:00Z"}],"id":"550e8400-e29b-41d4-a716-446655440000","code":"ELEC","parent_id":null,"name":"Electronics (Sample)","created_at":"2025-05-19T09:10:00Z"},{"children":[{"children":[],"id":"c550e8400-e29b-41d4-a716-446655440011","code":"CLOTH_MEN","parent_id":"550e8400-e29b-41d4-a716-446655440010","name":"Men's Clothing (Test)","created_at":"2025-05-19T09:25:00Z"},{"children":[],"id":"c550e8400-e29b-41d4-a716-446655440012","code":"CLOTH_WOMEN","parent_id":"550e8400-e29b-41d4-a716-446655440010","name":"Women's Clothing (Demo)","created_at":"2025-05-19T09:27:00Z"}],"id":"550e8400-e29b-41d4-a716-446655440010","code":"CLOTH","parent_id":null,"name":"Clothing & Apparel (Sample)","created_at":"2025-05-19T09:20:00Z"}],"id":"channel_001","created_at":"2025-05-19T09:00:00Z","code":"SAMPLE_SHOP","name":"Sample Shop (Demo Channel)"};
}
