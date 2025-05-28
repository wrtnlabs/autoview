
import Component from "../components/165";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"categories":[{"children":[{"children":[],"id":"33333333-3333-3333-3333-333333333333","code":"smartphones","parent_id":"11111111-1111-1111-1111-111111111111","name":"Smartphones (Sample)","created_at":"2025-05-02T11:00:00Z"},{"children":[{"children":[],"id":"55555555-5555-5555-5555-555555555555","code":"gaming-laptops","parent_id":"44444444-4444-4444-4444-444444444444","name":"Gaming Laptops (Test)","created_at":"2025-05-03T12:00:00Z"}],"id":"44444444-4444-4444-4444-444444444444","code":"laptops","parent_id":"11111111-1111-1111-1111-111111111111","name":"Laptops (Sample)","created_at":"2025-05-02T11:30:00Z"}],"id":"11111111-1111-1111-1111-111111111111","code":"electronics","parent_id":null,"name":"Electronics (Sample)","created_at":"2025-05-01T10:00:00Z"},{"children":[],"id":"22222222-2222-2222-2222-222222222222","code":"home-appliances","parent_id":null,"name":"Home Appliances (Test)","created_at":"2025-05-01T10:30:00Z"}],"id":"66666666-6666-6666-6666-666666666666","created_at":"2025-05-01T09:00:00Z","code":"online-store-test-channel","name":"Online Store Test Channel"};
}
