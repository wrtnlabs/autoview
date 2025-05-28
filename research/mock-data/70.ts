
import Component from "../components/70";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"pagination":{"current":1,"limit":10,"records":25,"pages":3},"data":[{"id":"a3e1b729-5e3d-4f89-9e23-cd1a5f82b678","citizen":{"id":"citizen-0001","created_at":"2024-12-01T09:15:00Z","mobile":"+1-555-123-4567","name":"John Doe (Test User)"},"mileage":{"id":"f47ac10b-58cc-4372-a567-0e02b2c3d479","value":200,"created_at":"2025-05-19T08:30:00Z","code":"PURCHASE_ORDER","source":"purchase","direction":1},"source_id":"9b2d6f8e-7c4a-4a3b-8361-a0b1c2d3e4f5","value":200,"balance":200,"created_at":"2025-05-19T08:30:00Z"},{"id":"b5d2c8a7-3f9b-4d1c-9b7e-e123456789ab","citizen":{"id":"citizen-0001","created_at":"2024-12-01T09:15:00Z","mobile":"+1-555-123-4567","name":"John Doe (Test User)"},"mileage":{"id":"1c9fc2a1-6e7f-4d3e-8a5b-b2c3d4e5f6a7","value":50,"created_at":"2025-05-20T10:45:00Z","code":"POINT_REDEMPTION","source":"redeem","direction":-1},"source_id":"2a4b6c8d-3e5f-7a9b-1c2d-d4e5f6a7b8c9","value":50,"balance":150,"created_at":"2025-05-20T10:45:00Z"}]};
}
