
import Component from "../components/109";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"parent":null,"children":[{"children":[{"children":[],"id":"44444444-4444-4444-4444-444444444444","code":"frozen-food","parent_id":"22222222-2222-2222-2222-222222222222","name":"Frozen (Test)","created_at":"2025-05-18T11:00:00Z"}],"id":"22222222-2222-2222-2222-222222222222","code":"meat","parent_id":"11111111-1111-1111-1111-111111111111","name":"Meat (Sample)","created_at":"2025-05-18T10:00:00Z"},{"children":[],"id":"33333333-3333-3333-3333-333333333333","code":"fruit","parent_id":"11111111-1111-1111-1111-111111111111","name":"Fruit (Sample)","created_at":"2025-05-18T10:30:00Z"}],"id":"11111111-1111-1111-1111-111111111111","code":"food","parent_id":null,"name":"Food (Test Category)","created_at":"2025-05-18T09:00:00Z"};
}
