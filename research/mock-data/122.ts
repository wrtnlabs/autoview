
import Component from "../components/122";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"pagination":{"current":1,"limit":10,"records":1,"pages":1},"data":[{"orders":[{"id":"order_3001_test","customer":{"type":"customer","member":null,"citizen":null,"id":"customer_4001_test","channel":{"id":"channel_5001","created_at":"2025-05-19T14:00:00Z","code":"WEB_TEST","name":"Web (Test Channel)"},"external_user":null,"href":"https://www.example.com/shop?test=true","referrer":null,"ip":"192.0.2.1","created_at":"2025-05-19T14:30:00Z"},"goods":[],"price":{"ticket_payments":[],"cash":100,"deposit":0,"mileage":10,"ticket":0,"nominal":110,"real":100},"publish":null,"created_at":"2025-05-19T15:00:00Z"}],"id":"d4c6a5f4-1234-4a9b-b567-89abcdef0123","seller":{"id":"seller_2001","created_at":"2025-05-19T14:31:00Z"},"journeys":[{"id":"journey_5001_test","created_at":"2025-05-19T15:05:00Z","deleted_at":null,"type":"preparing","title":"Package Preparation (Test)","description":"Preparing items for shipment (Test).","started_at":"2025-05-19T15:05:00Z","completed_at":null}],"pieces":[],"shippers":[{"id":"123e4567-e89b-12d3-a456-426614174000","created_at":"2025-05-19T15:10:00Z","company":"Sample Shipping Co. (Test)","name":"John Doe (Test Shipper)","mobile":"555-987-6543 (Test)"}],"state":"preparing","created_at":"2025-05-19T15:00:00Z"}]};
}
