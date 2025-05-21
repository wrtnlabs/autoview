
import Component from "../components/163";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"pagination":{"current":1,"limit":10,"records":2,"pages":1},"data":[{"categories":[{"children":[{"children":[],"id":"550e8400-e29b-41d4-a716-446655440001","code":"CAT-ELEC-COMP","parent_id":"550e8400-e29b-41d4-a716-446655440000","name":"Computers (Sample)","created_at":"2025-05-19T09:17:00Z"},{"children":[],"id":"550e8400-e29b-41d4-a716-446655440002","code":"CAT-ELEC-MOB","parent_id":"550e8400-e29b-41d4-a716-446655440000","name":"Mobile Devices (Sample)","created_at":"2025-05-19T09:18:00Z"}],"id":"550e8400-e29b-41d4-a716-446655440000","code":"CAT-ELEC","parent_id":null,"name":"Electronics (Sample)","created_at":"2025-05-19T09:16:00Z"},{"children":[{"children":[],"id":"550e8400-e29b-41d4-a716-446655440011","code":"CAT-CLOTH-MEN","parent_id":"550e8400-e29b-41d4-a716-446655440010","name":"Men's Clothing (Sample)","created_at":"2025-05-19T09:20:00Z"}],"id":"550e8400-e29b-41d4-a716-446655440010","code":"CAT-CLOTH","parent_id":null,"name":"Clothing (Sample)","created_at":"2025-05-19T09:19:00Z"}],"id":"channel-001","created_at":"2025-05-19T09:15:00Z","code":"CHNL001","name":"Sample Channel A (Test)"},{"categories":[{"children":[],"id":"550e8400-e29b-41d4-a716-446655440020","code":"CAT-TOYS","parent_id":null,"name":"Toys (Sample)","created_at":"2025-05-19T10:01:00Z"}],"id":"channel-002","created_at":"2025-05-19T10:00:00Z","code":"CHNL002","name":"Sample Channel B (Test)"}]};
}
