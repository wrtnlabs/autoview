
import Component from "../components/125";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"journey_001_sample","created_at":"2025-05-18T08:45:00Z","deleted_at":null,"type":"shipping","title":"Shipping Package (Test)","description":"The package has been shipped and is currently in transit to the destination address. (Sample Data)","started_at":"2025-05-19T10:00:00Z","completed_at":"2025-05-20T15:45:00Z"};
}
