
import Component from "../components/125";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"journey_sample_001","created_at":"2025-05-19T07:30:00Z","deleted_at":null,"type":"shipping","title":"Sample Shipping Step (Test)","description":"Package is on its way from the central warehouse to the regional distribution center. This is a fictional test entry.","started_at":"2025-05-19T07:45:00Z","completed_at":"2025-05-19T09:15:00Z"};
}
