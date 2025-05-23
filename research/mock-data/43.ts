
import Component from "../components/43";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"pagination":{"current":1,"limit":10,"records":25,"pages":3},"data":[{"id":"channel_001","created_at":"2025-05-01T09:00:00Z","code":"online_store","name":"Online Store (Test)"},{"id":"channel_002","created_at":"2025-05-02T10:15:30Z","code":"mobile_app","name":"Mobile App (Sample)"},{"id":"channel_003","created_at":"2025-05-03T11:45:00Z","code":"third_party_marketplace","name":"Third-Party Marketplace (Dummy)"}]};
}
