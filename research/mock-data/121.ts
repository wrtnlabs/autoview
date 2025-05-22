
import Component from "../components/121";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"DELIVERY_TEST_001","seller":{"id":"SELLER_TEST_123","created_at":"2025-05-18T09:15:00Z"},"journeys":[{"id":"JOURNEY_TEST_01","created_at":"2025-05-18T09:30:00Z","deleted_at":null,"type":"preparing","title":"Order Preparation Step","description":"Preparing items for shipment according to order requirements. All data fictional.","started_at":"2025-05-18T09:00:00Z","completed_at":"2025-05-18T12:45:00Z"},{"id":"JOURNEY_TEST_02","created_at":"2025-05-19T00:30:00Z","deleted_at":null,"type":"shipping","title":null,"description":null,"started_at":"2025-05-19T01:00:00Z","completed_at":null}],"pieces":[{"id":"PIECE_TEST_001","publish_id":"PUBLISH_ORDER_456","good_id":"ORDER_GOOD_789","stock_id":"STOCK_UNIT_321","quantity":2},{"id":"PIECE_TEST_002","publish_id":"PUBLISH_ORDER_456","good_id":"ORDER_GOOD_789","stock_id":"STOCK_UNIT_654","quantity":1.5}],"shippers":[{"id":"550e8400-e29b-41d4-a716-446655440000","created_at":"2025-05-18T13:20:00Z","company":"Sample Shipping Co. (Test)","name":"John Shipper (Test)","mobile":"+1-800-555-0123"},{"id":"123e4567-e89b-12d3-a456-426614174000","created_at":"2025-05-19T02:00:00Z","company":null,"name":"Jane Delivery (Dummy)","mobile":"+1-800-555-0456"}],"state":"shipping","created_at":"2025-05-18T09:00:00Z"};
}
