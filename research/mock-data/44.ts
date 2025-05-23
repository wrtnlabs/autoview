
import Component from "../components/44";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"categories":[{"children":[{"children":[],"id":"b4e6f8a3-2d45-5e7f-9b3c-0987654321ba","code":"MOBILE_PHONES_SAMPLE","parent_id":"a3d8f7b2-1c34-4d6e-8a2b-1234567890ab","name":"Mobile Phones (Sample)","created_at":"2025-05-02T08:30:00Z"},{"children":[],"id":"c5f7e9b4-3e56-6f8a-0c4d-112233445566","code":"LAPTOPS_SAMPLE","parent_id":"a3d8f7b2-1c34-4d6e-8a2b-1234567890ab","name":"Laptops (Sample)","created_at":"2025-05-02T09:00:00Z"}],"id":"a3d8f7b2-1c34-4d6e-8a2b-1234567890ab","code":"ELECTRONICS_SAMPLE","parent_id":null,"name":"Electronics (Test)","created_at":"2025-05-01T12:00:00Z"},{"children":[{"children":[],"id":"e7a9b1d6-5b78-8b0c-2e6f-334455667788","code":"MENS_CLOTHING_SAMPLE","parent_id":"d6f8a0c5-4a67-7a9b-1d5e-223344556677","name":"Men's Clothing (Sample)","created_at":"2025-05-04T10:00:00Z"}],"id":"d6f8a0c5-4a67-7a9b-1d5e-223344556677","code":"APPAREL_SAMPLE","parent_id":null,"name":"Apparel (Test)","created_at":"2025-05-03T11:15:00Z"}],"id":"f1e2d3c4-b5a6-7a8b-9c0d-1e2f3a4b5c6d","created_at":"2025-04-30T07:45:00Z","code":"SAMPLE_CHANNEL","name":"Sample Shopping Channel (Test)"};
}
