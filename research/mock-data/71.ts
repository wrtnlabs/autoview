
import Component from "../components/71";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"3fa85f64-5717-4562-b3fc-2c963f66afa6","citizen":{"id":"CITIZEN-1234","created_at":"2025-05-18T09:15:00Z","mobile":"+1-555-012-3456","name":"Jane Doe (Test Account)"},"mileage":{"id":"9b2d81f8-8e1e-4db2-8c9b-1d2f3a4b5c6d","value":120,"created_at":"2025-05-19T14:30:00Z","code":"PURCHASE_SAMPLE","source":"Online Shop Order (Test)","direction":1},"source_id":"e7c9b7b3-f5f0-4e19-a17f-8a3f28df33c8","value":120,"balance":500,"created_at":"2025-05-19T14:35:00Z"};
}
