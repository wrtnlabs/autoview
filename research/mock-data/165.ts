
import Component from "../components/165";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"categories":[{"children":[{"children":[],"id":"f1e2d3c4-b5a6-7890-cdef-1234567890ab","code":"ELEC-PHN","parent_id":"d9e7f0c1-2345-6789-abcd-ef0123456789","name":"Phones (Test)","created_at":"2025-05-18T14:00:00Z"},{"children":[],"id":"a2b3c4d5-e6f7-8901-bcde-2345678901cd","code":"ELEC-TV","parent_id":"d9e7f0c1-2345-6789-abcd-ef0123456789","name":"Televisions (Test)","created_at":"2025-05-18T14:05:00Z"}],"id":"d9e7f0c1-2345-6789-abcd-ef0123456789","code":"ELEC","parent_id":null,"name":"Electronics (Test)","created_at":"2025-05-18T13:00:00Z"},{"children":[{"children":[],"id":"b4c5d6e7-f8a9-0123-bcde-3456789012ef","code":"HOME-GRN","parent_id":"e8f9a0b1-c2d3-4567-89ab-cdef01234567","name":"Garden Supplies (Test)","created_at":"2025-05-18T14:10:00Z"}],"id":"e8f9a0b1-c2d3-4567-89ab-cdef01234567","code":"HOME","parent_id":null,"name":"Home & Garden (Test)","created_at":"2025-05-18T13:10:00Z"}],"id":"b3b1a4c0-9c88-4f3f-a3fe-1e1c2f5e7d9a","created_at":"2025-05-18T12:00:00Z","code":"SHOP_CH_01_TEST","name":"Sample Shopping Channel (Test)"};
}
