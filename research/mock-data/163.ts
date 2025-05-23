
import Component from "../components/163";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"pagination":{"current":1,"limit":5,"records":2,"pages":1},"data":[{"categories":[{"children":[{"children":[],"id":"a1b2c3d4-5678-1234-9abc-0def98765432","code":"computers","parent_id":"f1e2d3c4-5678-1234-9abc-0def12345678","name":"Computers (Sample)","created_at":"2025-05-19T10:20:00Z"},{"children":[],"id":"b1c2d3e4-5678-1234-9abc-0def11223344","code":"cameras","parent_id":"f1e2d3c4-5678-1234-9abc-0def12345678","name":"Cameras (Sample)","created_at":"2025-05-19T10:25:00Z"}],"id":"f1e2d3c4-5678-1234-9abc-0def12345678","code":"electronics","parent_id":null,"name":"Electronics (Test)","created_at":"2025-05-19T10:15:00Z"},{"children":[{"children":[],"id":"d1e2f3a4-5678-1234-9abc-0def44332211","code":"mens_clothing","parent_id":"c1d2e3f4-5678-1234-9abc-0def99887766","name":"Men's Clothing (Sample)","created_at":"2025-05-19T10:30:00Z"}],"id":"c1d2e3f4-5678-1234-9abc-0def99887766","code":"clothing","parent_id":null,"name":"Clothing (Test)","created_at":"2025-05-19T10:18:00Z"}],"id":"9e8d7c6b-1234-4c5d-9e0f-1b2a3c4d5e6f","created_at":"2025-05-19T10:15:00Z","code":"online_store","name":"Online Store (Sample)"},{"categories":[],"id":"8a7b6c5d-4321-4e6f-8a9b-0c1d2e3f4a5b","created_at":"2025-05-18T09:00:00Z","code":"wholesale","name":"Wholesale Channel (Test)"}]};
}
