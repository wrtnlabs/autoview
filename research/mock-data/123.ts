
import Component from "../components/123";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"orders":[],"id":"delivery_invert_001","seller":{"id":"seller_001","created_at":"2025-05-18T09:00:00Z"},"journeys":[{"id":"journey_001","created_at":"2025-05-18T09:30:00Z","deleted_at":null,"type":"shipping","title":"Shipped via Test Carrier (Sample)","description":"Package departed from sample warehouse for UI testing.","started_at":"2025-05-18T10:00:00Z","completed_at":null}],"pieces":[{"id":"piece_001","publish_id":"publish_001","good_id":"good_001","stock_id":"stock_001","quantity":2}],"shippers":[{"id":"7c9e6679-7425-40de-944b-e07fc1f90ae7","created_at":"2025-05-18T09:45:00Z","company":"Test Carrier Sample Inc.","name":"John Doe (Test Shipper)","mobile":"555-0102"}],"state":"shipping","created_at":"2025-05-18T09:00:00Z"};
}
