
import Component from "../components/147";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"pagination":{"current":1,"limit":10,"records":2,"pages":1},"data":[{"writer":{"customer_id":"cust-1001","name":"Sample Customer (Test)"},"id":"e8a73210-1c2d-4f76-a1b2-123456789abc","parent_id":null,"snapshots":[{"id":"snap-001","created_at":"2025-05-19T14:30:00Z","format":"md","body":"Hello, I have a question about the product specifications. Could you please clarify the dimensions in centimeters?","files":[{"name":"image_spec","extension":"png","url":"https://www.example.com/files/sample-specs-image.png"},{"name":"","extension":null,"url":"https://www.example.com/files/.gitignore"}]}],"created_at":"2025-05-19T14:30:00Z"},{"writer":{"seller_id":"seller-2002","name":"Sample Seller (Test)"},"id":"f47ac10b-58cc-4372-a567-0e02b2c3d479","parent_id":"e8a73210-1c2d-4f76-a1b2-123456789abc","snapshots":[{"id":"snap-005","created_at":"2025-05-19T14:45:00Z","format":"txt","body":"Thank you for your inquiry. The product dimensions are 30cm x 20cm x 15cm.","files":[]},{"id":"snap-006","created_at":"2025-05-19T15:00:00Z","format":"html","body":"<p>Updated answer: The dimensions are indeed 30cm (width) × 20cm (height) × 15cm (depth). Let us know if you need further assistance.</p>","files":[{"name":"dimensions_table","extension":"csv","url":"https://www.example.com/files/dimensions-sample.csv"}]}],"created_at":"2025-05-19T14:45:00Z"}]};
}
