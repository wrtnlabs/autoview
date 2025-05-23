
import Component from "../components/144";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"seller":{"id":"seller_789xyz","created_at":"2025-04-10T13:20:00Z"},"id":"answer_123abc","snapshots":[{"id":"snapshot_001","created_at":"2025-05-19T08:15:00Z","format":"md","title":"Initial Inquiry Response (Sample)","body":"Thank you for your question regarding the sale snapshot. This is a sample answer body.\nPlease refer to the attached documents for more details.","files":[{"name":"invoice","extension":"pdf","url":"https://files.example.com/invoice.pdf"}]},{"id":"snapshot_002","created_at":"2025-05-19T09:30:00Z","format":"html","title":"Updated Inquiry Response (Sample)","body":"<p>This is an <strong>updated</strong> answer body for your inquiry. All content is <em>fictional</em> and for <span style=\"color:blue\">testing</span> purposes.</p>","files":[{"name":"product_image","extension":"jpg","url":"https://cdn.example.com/images/product_image.jpg"},{"name":"README","extension":null,"url":"https://files.example.com/README"}]}],"created_at":"2025-05-19T10:00:00Z"};
}
