
import Component from "../components/138";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"snapshot_001_test","created_at":"2025-05-19T14:30:00Z","format":"html","title":"Sample Shopping Sale Inquiry Answer (Test)","body":"<p>This is a <strong>sample</strong> answer to the shopping sale inquiry. It includes test details and fictitious data for UI rendering purposes.</p>","files":[{"name":"product_manual","extension":"pdf","url":"https://files.example.com/uploads/product_manual.pdf"},{"name":"README","extension":null,"url":"https://files.example.com/uploads/README"}]};
}
