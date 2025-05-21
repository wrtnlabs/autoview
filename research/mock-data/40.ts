
import Component from "../components/40";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"parent":null,"children":[{"children":[{"children":[],"id":"b3c4d5e6-f7a8-9b0c-d1e2-f3a4b5c6d7e8","code":"frozen","parent_id":"a2b3c4d5-e6f7-8a9b-c0d1-e2f3a4b5c6d7","name":"Frozen Foods (Sample)","created_at":"2025-05-19T14:40:00Z"}],"id":"a2b3c4d5-e6f7-8a9b-c0d1-e2f3a4b5c6d7","code":"meat","parent_id":"e1e1c3a8-7f3c-4d2a-9f3e-1b2a3c4d5e6f","name":"Meat (Sample)","created_at":"2025-05-19T14:35:00Z"},{"children":[{"children":[],"id":"d5e6f7a8-b9c0-1d2e-f3a4-b5c6d7e8f9a0","code":"notebook","parent_id":"c4d5e6f7-a8b9-0c1d-e2f3-a4b5c6d7e8f9","name":"Notebooks (Sample)","created_at":"2025-05-19T14:42:00Z"}],"id":"c4d5e6f7-a8b9-0c1d-e2f3-a4b5c6d7e8f9","code":"electronics","parent_id":"e1e1c3a8-7f3c-4d2a-9f3e-1b2a3c4d5e6f","name":"Electronics (Sample)","created_at":"2025-05-19T14:36:00Z"}],"id":"e1e1c3a8-7f3c-4d2a-9f3e-1b2a3c4d5e6f","code":"category-root","parent_id":null,"name":"All Categories (Sample)","created_at":"2025-05-19T14:30:00Z"};
}
