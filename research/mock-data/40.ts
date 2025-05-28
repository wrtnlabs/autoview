
import Component from "../components/40";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"parent":null,"children":[{"children":[{"children":[],"id":"a12b3456-c789-4d0e-f012-3456789abcde","code":"CITRUS","parent_id":"1e4a67d2-3b18-4a4d-9f01-abcdef123456","name":"Citrus (Sample)","created_at":"2025-05-19T09:15:00Z"}],"id":"1e4a67d2-3b18-4a4d-9f01-abcdef123456","code":"FRUIT","parent_id":"fa7a1f14-2d3b-4e6b-8a5d-1234567890ab","name":"Fruits (Test Category)","created_at":"2025-05-19T09:00:00Z"},{"children":[],"id":"22b7a3e1-d8f3-4c45-a123-098765fedcba","code":"VEG","parent_id":"fa7a1f14-2d3b-4e6b-8a5d-1234567890ab","name":"Vegetables (Sample)","created_at":"2025-05-19T09:05:00Z"}],"id":"fa7a1f14-2d3b-4e6b-8a5d-1234567890ab","code":"ALL","parent_id":null,"name":"All Categories (Sample Root)","created_at":"2025-05-19T08:55:00Z"};
}
