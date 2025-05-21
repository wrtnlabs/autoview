
import Component from "../components/91";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"writer":{"id":"cust_001","role":"Customer","name":"Sample Customer (Test Account)"},"id":"cmt_12345","parent_id":"3fa85f64-5717-4562-b3fc-2c963f66afa6","snapshots":[{"id":"d2719b10-9c9b-4d2e-9b7a-3f9da4a83101","created_at":"2025-05-19T14:30:00Z","format":"md","body":"This is a sample inquiry comment. It contains the initial question about product details. (Sample)","files":[{"name":"image_example","extension":"png","url":"https://www.example.com/files/image_example.png"}]},{"id":"e382a561-ae51-4d71-b3a0-5dcabf4b2432","created_at":"2025-05-19T14:33:00Z","format":"md","body":"Updated comment with more information. Added a note about shipping time. (Sample Edit)","files":[{"name":"shipping_info","extension":"pdf","url":"https://www.example.com/files/shipping_info.pdf"}]}],"created_at":"2025-05-19T14:35:00Z"};
}
