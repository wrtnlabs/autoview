
import Component from "../components/456";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"guid":"a1b2c3d4-e5f6-7a8b-9c0d-e1f2a3b4c5d6","delivered_at":"2025-05-19T14:30:00Z","redelivery":false,"duration":123,"status":"Delivered (Sample)","status_code":200,"event":"push","action":null,"installation_id":2025,"repository_id":3035,"throttled_at":"2025-05-19T14:31:00Z"},{"id":102,"guid":"f6e5d4c3-b2a1-0d9c-8b7a-6f5e4d3c2b1a","delivered_at":"2025-05-19T15:45:30Z","redelivery":true,"duration":456,"status":"Timeout (Mock)","status_code":504,"event":"pull_request","action":"opened","installation_id":null,"repository_id":null}];
}
