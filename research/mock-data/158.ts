
import Component from "../components/158";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"pagination":{"current":1,"limit":10,"records":3,"pages":1},"data":[{"id":"supp-001-test","value":20,"created_at":"2025-05-01T08:30:00Z"},{"id":"supp-002-test","value":15,"created_at":"2025-05-10T12:45:30Z"},{"id":"supp-003-test","value":50,"created_at":"2025-05-15T16:00:00Z"}]};
}
