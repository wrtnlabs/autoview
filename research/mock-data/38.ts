
import Component from "../components/38";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"parent":null,"children":[{"children":[{"children":[{"children":[],"id":"33333333-3333-3333-3333-333333333333","code":"frozen","parent_id":"22222222-2222-2222-2222-222222222222","name":"Frozen Food (Dummy)","created_at":"2025-05-19T13:00:00Z"}],"id":"22222222-2222-2222-2222-222222222222","code":"meat","parent_id":"11111111-1111-1111-1111-111111111111","name":"Meat (Sample)","created_at":"2025-05-19T12:30:00Z"}],"id":"11111111-1111-1111-1111-111111111111","code":"food","parent_id":"00000000-0000-0000-0000-000000000000","name":"Food (Test)","created_at":"2025-05-19T12:00:00Z"},{"children":[{"children":[{"children":[],"id":"66666666-6666-6666-6666-666666666666","code":"15inch","parent_id":"55555555-5555-5555-5555-555555555555","name":"15-inch (Sample)","created_at":"2025-05-19T13:15:00Z"}],"id":"55555555-5555-5555-5555-555555555555","code":"notebooks","parent_id":"44444444-4444-4444-4444-444444444444","name":"Notebooks (Test)","created_at":"2025-05-19T12:45:00Z"}],"id":"44444444-4444-4444-4444-444444444444","code":"electronics","parent_id":"00000000-0000-0000-0000-000000000000","name":"Electronics (Sample)","created_at":"2025-05-19T12:05:00Z"}],"id":"00000000-0000-0000-0000-000000000000","code":"root_category","parent_id":null,"name":"All Categories (Sample)","created_at":"2025-05-19T11:00:00Z"};
}
