
import Component from "../components/160";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"parent":null,"children":[{"children":[{"children":[],"id":"44444444-4444-4444-4444-444444444444","code":"frozen_meat","parent_id":"22222222-2222-2222-2222-222222222222","name":"Frozen Meat (Sample)","created_at":"2025-05-19T12:10:00Z"}],"id":"22222222-2222-2222-2222-222222222222","code":"meat","parent_id":"11111111-1111-1111-1111-111111111111","name":"Meat (Sample)","created_at":"2025-05-19T12:05:00Z"},{"children":[{"children":[],"id":"55555555-5555-5555-5555-555555555555","code":"fresh_fruit","parent_id":"33333333-3333-3333-3333-333333333333","name":"Fresh Fruit (Sample)","created_at":"2025-05-19T12:11:00Z"}],"id":"33333333-3333-3333-3333-333333333333","code":"fruit","parent_id":"11111111-1111-1111-1111-111111111111","name":"Fruit (Sample)","created_at":"2025-05-19T12:07:00Z"}],"id":"11111111-1111-1111-1111-111111111111","code":"food_bev","parent_id":null,"name":"Food & Beverages (Sample)","created_at":"2025-05-19T12:00:00Z"};
}
