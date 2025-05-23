
import Component from "../components/13";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"pagination":{"current":1,"limit":10,"records":25,"pages":3},"data":[{"id":"d3c1f8a2-4e0d-4cbb-8491-abcdef123456","value":1500,"created_at":"2025-05-19T08:30:00Z","code":"MILG_SAMPLE_001","source":"online_purchase_sample","direction":1},{"id":"a1b2c3d4-e5f6-47a8-1234-abcdef789012","value":null,"created_at":"2025-05-18T16:45:30Z","code":"MILG_SAMPLE_002","source":"promotional_offer_sample","direction":-1},{"id":"9f8e7d6c-5b4a-3210-fedc-ba9876543210","value":750,"created_at":"2025-05-17T12:00:00Z","code":"MILG_SAMPLE_003","source":"refund_adjustment_sample","direction":1}]};
}
