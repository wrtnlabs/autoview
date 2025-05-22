
import Component from "../components/121";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"DELIVERY_001_SAMPLE","seller":{"id":"SELLER_001_SAMPLE","created_at":"2025-05-18T09:15:00Z"},"journeys":[{"id":"JOURNEY_001_SAMPLE","created_at":"2025-05-18T09:20:00Z","deleted_at":null,"type":"preparing","title":"Order Preparing (Sample)","description":"Preparing the order packaging for delivery (Test data).","started_at":"2025-05-18T09:25:00Z","completed_at":"2025-05-18T10:00:00Z"},{"id":"JOURNEY_002_SAMPLE","created_at":"2025-05-18T10:05:00Z","deleted_at":null,"type":"shipping","title":null,"description":null,"started_at":"2025-05-18T10:10:00Z","completed_at":null}],"pieces":[{"id":"PIECE_001_SAMPLE","publish_id":"PUBLISH_789_SAMPLE","good_id":"GOOD_456_SAMPLE","stock_id":"STOCK_111_SAMPLE","quantity":2},{"id":"PIECE_002_SAMPLE","publish_id":"PUBLISH_789_SAMPLE","good_id":"GOOD_457_SAMPLE","stock_id":"STOCK_112_SAMPLE","quantity":1.5}],"shippers":[{"id":"550e8400-e29b-41d4-a716-446655440000","created_at":"2025-05-18T10:00:00Z","company":"Sample Logistics Co. (Test)","name":"John Doe (Sample Courier)","mobile":"+1-555-0123 (Test)"},{"id":"123e4567-e89b-12d3-a456-426614174000","created_at":"2025-05-18T11:00:00Z","company":null,"name":"Automated Shipper Bot (Sample)","mobile":"555-000-5678 (Sample)"}],"state":"shipping","created_at":"2025-05-18T09:00:00Z"};
}
