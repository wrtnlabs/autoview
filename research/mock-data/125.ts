
import Component from "../components/125";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"journey_shipping_test_001","created_at":"2025-05-18T07:45:00Z","deleted_at":null,"type":"shipping","title":"Shipment Dispatched (Test)","description":"The package has been dispatched from the warehouse and is currently in transit to the destination (Sample).","started_at":"2025-05-18T08:00:00Z","completed_at":"2025-05-19T16:30:00Z"};
}
