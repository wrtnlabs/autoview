
import Component from "../components/38";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"parent":null,"children":[{"children":[{"children":[],"id":"33333333-3333-3333-3333-333333333333","code":"frozen-food","parent_id":"22222222-2222-2222-2222-222222222222","name":"Frozen Food (Sample)","created_at":"2025-05-19T08:30:00Z"}],"id":"22222222-2222-2222-2222-222222222222","code":"meat","parent_id":"11111111-1111-1111-1111-111111111111","name":"Meat (Test)","created_at":"2025-05-19T08:15:00Z"},{"children":[],"id":"44444444-4444-4444-4444-444444444444","code":"vegetarian","parent_id":"11111111-1111-1111-1111-111111111111","name":"Vegetarian Options (Sample)","created_at":"2025-05-19T08:20:00Z"}],"id":"11111111-1111-1111-1111-111111111111","code":"food","parent_id":null,"name":"Food (Test Category)","created_at":"2025-05-19T08:00:00Z"};
}
