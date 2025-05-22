
import Component from "../components/40";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"parent":null,"children":[{"children":[{"children":[],"id":"11111111-2222-3333-4444-555555555555","code":"frozen-sample","parent_id":"d4f1e2b3-4c6d-7e8f-0123-abcdef123456","name":"Frozen (Sample)","created_at":"2025-05-19T09:30:00Z"}],"id":"d4f1e2b3-4c6d-7e8f-0123-abcdef123456","code":"meat-sample","parent_id":"e7b8f380-1d3a-4c5e-a3ad-123456abcdef","name":"Meat (Sample)","created_at":"2025-05-19T09:00:00Z"},{"children":[{"children":[],"id":"66666666-7777-8888-9999-000000000000","code":"fresh-sample","parent_id":"a1b2c3d4-5e6f-7a8b-9c0d-09876fedcba0","name":"Fresh (Sample)","created_at":"2025-05-19T09:45:00Z"}],"id":"a1b2c3d4-5e6f-7a8b-9c0d-09876fedcba0","code":"fruit-sample","parent_id":"e7b8f380-1d3a-4c5e-a3ad-123456abcdef","name":"Fruit (Sample)","created_at":"2025-05-19T09:15:00Z"}],"id":"e7b8f380-1d3a-4c5e-a3ad-123456abcdef","code":"food-sample","parent_id":null,"name":"Food (Sample)","created_at":"2025-05-19T08:00:00Z"};
}
