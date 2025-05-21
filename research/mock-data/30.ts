
import Component from "../components/30";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"writer":{"id":"cust_1001","role":"Customer","name":"Sample Customer (Test)"},"id":"123e4567-e89b-12d3-a456-426614174000","parent_id":"22222222-3333-4444-5555-666666666666","snapshots":[{"id":"11111111-2222-3333-4444-555555555555","created_at":"2025-05-18T09:15:00Z","format":"md","body":"This is a sample inquiry comment. Please check the product details. (Test)","files":[{"name":"product_image","extension":"png","url":"https://www.example.com/assets/sample-product-image.png"}]},{"id":"66666666-7777-8888-9999-aaaaaaaaaaaa","created_at":"2025-05-19T10:30:00Z","format":"html","body":"<p>Updated comment content with additional information. (Test)</p>","files":[]}],"created_at":"2025-05-18T09:15:00Z"};
}
