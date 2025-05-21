
import Component from "../components/96";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"writer":{"role":"customer","id":"cust_001","displayName":"Sample Customer (Test)"},"id":"35e1f5d4-9c1e-4f6a-b8a2-d3e4f5678901","parent_id":"a1b2c3d4-e5f6-7a8b-9c0d-ef1234567890","snapshots":[{"id":"11111111-2222-3333-4444-555555555555","created_at":"2025-05-19T14:30:00Z","format":"txt","body":"Initial comment body for sale inquiry (Sample).","files":[]},{"id":"66666666-7777-8888-9999-000000000000","created_at":"2025-05-19T15:00:00Z","format":"md","body":"Edited comment body with more details and *markdown* formatting (Test).","files":[{"name":"spec_sheet","extension":"pdf","url":"https://www.example.com/files/spec_sheet.pdf"},{"name":"sample-image","extension":"png","url":"https://www.example.com/files/sample-image.png"}]}],"created_at":"2025-05-19T14:30:00Z"};
}
