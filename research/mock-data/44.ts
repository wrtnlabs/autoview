
import Component from "../components/44";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"categories":[{"children":[{"children":[],"id":"2a7d3c9f-8e1f-4d7e-9b24-abcd23456789","code":"ELEC-MOB","parent_id":"1e4d3a9e-7b2f-4c6d-9a23-fb8a12345678","name":"Mobile Phones (Test)","created_at":"2025-05-18T09:45:00Z"},{"children":[],"id":"3b8e4d0a-9f2f-4e8f-9c25-bcde34567890","code":"ELEC-LAP","parent_id":"1e4d3a9e-7b2f-4c6d-9a23-fb8a12345678","name":"Laptops (Test)","created_at":"2025-05-18T09:50:00Z"}],"id":"1e4d3a9e-7b2f-4c6d-9a23-fb8a12345678","code":"ELEC","parent_id":null,"name":"Electronics (Test)","created_at":"2025-05-18T09:30:00Z"},{"children":[{"children":[],"id":"5d0a6f2c-bf41-40a0-9e27-defa56789012","code":"HOME-KIT","parent_id":"4c9f5e1b-af30-4f9f-9d26-cdef45678901","name":"Kitchen Appliances (Test)","created_at":"2025-05-18T10:15:00Z"}],"id":"4c9f5e1b-af30-4f9f-9d26-cdef45678901","code":"HOME","parent_id":null,"name":"Home Appliances (Test)","created_at":"2025-05-18T10:00:00Z"}],"id":"f5417e21-8c00-4d22-9a77-0f6f1a2b3c4d","created_at":"2025-05-19T12:00:00Z","code":"SHOP-001","name":"Demo Shopping Channel (Test)"};
}
