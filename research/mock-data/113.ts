
import Component from "../components/113";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"categories":[{"children":[{"children":[],"id":"bfa2c813-a123-4ebd-9f3a-def456def789","code":"ELEC_PHONES","parent_id":"8a1f2b37-3cdf-4a85-b2c4-abc123abc456","name":"Mobile Phones","created_at":"2025-05-18T10:00:00Z"},{"children":[],"id":"cfad1e92-7c9d-46e0-8bd9-ghi012ghi345","code":"ELEC_LAPTOPS","parent_id":"8a1f2b37-3cdf-4a85-b2c4-abc123abc456","name":"Laptops","created_at":"2025-05-18T10:15:00Z"}],"id":"8a1f2b37-3cdf-4a85-b2c4-abc123abc456","code":"ELEC","parent_id":null,"name":"Electronics","created_at":"2025-05-18T09:00:00Z"},{"children":[{"children":[{"children":[],"id":"d17e42b3-9fde-4a9b-8457-fedcba654321","code":"HOME_FURN_OFFICE","parent_id":"3478ab56-c123-4de0-8abc-def345abc678","name":"Office Furniture","created_at":"2025-05-18T11:00:00Z"}],"id":"3478ab56-c123-4de0-8abc-def345abc678","code":"HOME_FURN","parent_id":"957bc123-4567-4def-89ab-9876fedcba21","name":"Furniture","created_at":"2025-05-18T10:30:00Z"}],"id":"957bc123-4567-4def-89ab-9876fedcba21","code":"HOME","parent_id":null,"name":"Home & Kitchen","created_at":"2025-05-18T09:30:00Z"}],"id":"4c72d1a9-3d98-4b4c-8b2e-ffabc123abcd","created_at":"2025-05-19T12:00:00Z","code":"SHOP_TEST","name":"Sample Shopping Channel (Test)"};
}
