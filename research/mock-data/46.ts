
import Component from "../components/46";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"channel-001","created_at":"2025-05-19T12:00:00Z","code":"ONLINE_RETAIL_CHANNEL","name":"Online Retail Channel (Test)","categories":[{"id":"550e8400-e29b-41d4-a716-446655440000","created_at":"2025-05-19T12:05:00Z","code":"ELECTRONICS","name":"Electronics (Sample)","parent_id":null,"children":[{"id":"f47ac10b-58cc-4372-a567-0e02b2c3d479","created_at":"2025-05-19T12:10:00Z","code":"MOBILE_PHONES","name":"Mobile Phones (Test)","parent_id":"550e8400-e29b-41d4-a716-446655440000","children":[]},{"id":"9c858901-8a57-4791-81fe-4c455b099bc9","created_at":"2025-05-19T12:15:00Z","code":"LAPTOPS","name":"Laptops (Sample)","parent_id":"550e8400-e29b-41d4-a716-446655440000","children":[]}]},{"id":"c56a4180-65aa-42ec-a945-5fd21dec0538","created_at":"2025-05-19T12:20:00Z","code":"CLOTHING","name":"Clothing (Sample)","parent_id":null,"children":[{"id":"e13b1bce-2493-4d5f-8205-48bec8fb0e1e","created_at":"2025-05-19T12:25:00Z","code":"MENS_CLOTHING","name":"Men's Clothing (Test)","parent_id":"c56a4180-65aa-42ec-a945-5fd21dec0538","children":[]}]}]};
}
