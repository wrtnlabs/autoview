
import Component from "../components/121";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"dly_001_sample","seller":{"id":"seller_ABC_sample","created_at":"2025-05-17T08:30:00Z"},"journeys":[{"id":"journey_001_prep","created_at":"2025-05-18T09:20:00Z","deleted_at":null,"type":"preparing","title":"Preparation Complete (Sample)","description":"All items prepared for packaging (Test).","started_at":"2025-05-18T09:20:00Z","completed_at":"2025-05-18T10:00:00Z"},{"id":"journey_002_ship","created_at":"2025-05-18T10:15:00Z","deleted_at":null,"type":"shipping","title":null,"description":"Shipped via sample courier.","started_at":"2025-05-18T10:15:00Z","completed_at":null}],"pieces":[{"id":"piece_001","publish_id":"publish_1001","good_id":"good_5001","stock_id":"stock_5001","quantity":2.5},{"id":"piece_002","publish_id":"publish_1002","good_id":"good_5002","stock_id":"stock_5002","quantity":1}],"shippers":[{"id":"550e8400-e29b-41d4-a716-446655440000","created_at":"2025-05-18T10:30:00Z","company":"Sample Courier Inc. (Test)","name":"John Doe (Test Shipper)","mobile":"+1-555-0199"},{"id":"f47ac10b-58cc-4372-a567-0e02b2c3d479","created_at":"2025-05-18T10:45:00Z","company":null,"name":"Jane Smith (Sample)","mobile":"+1-555-0246"}],"state":"shipping","created_at":"2025-05-18T09:15:00Z"};
}
