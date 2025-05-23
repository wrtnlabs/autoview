
import Component from "../components/164";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"categories":[{"children":[{"children":[],"id":"b1111111-c222-3333-d444-555555555555","code":"mobiles_test","parent_id":"a3f1b2c3-d4e5-6789-0abc-def123456789","name":"Mobile Phones (Test)","created_at":"2025-05-19T12:02:00Z"},{"children":[],"id":"b6666666-c777-8888-d999-000000000000","code":"laptops_test","parent_id":"a3f1b2c3-d4e5-6789-0abc-def123456789","name":"Laptops (Test)","created_at":"2025-05-19T12:02:30Z"}],"id":"a3f1b2c3-d4e5-6789-0abc-def123456789","code":"electronics_test","parent_id":null,"name":"Electronics (Test)","created_at":"2025-05-19T12:01:00Z"},{"children":[{"children":[],"id":"c1234567-d890-1234-e567-890abcdef123","code":"kitchen_test","parent_id":"f0e1d2c3-b4a5-9678-1234-fedcba098765","name":"Kitchen (Test)","created_at":"2025-05-19T12:06:00Z"}],"id":"f0e1d2c3-b4a5-9678-1234-fedcba098765","code":"home_garden_test","parent_id":null,"name":"Home & Garden (Test)","created_at":"2025-05-19T12:05:00Z"}],"id":"e0c8b904-a843-4d1a-b7c2-123456789abc","created_at":"2025-05-19T12:00:00Z","code":"online_store_test","name":"Sample E-Commerce Channel (Test)"};
}
