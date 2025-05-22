
import Component from "../components/158";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"pagination":{"current":1,"limit":10,"records":2,"pages":1},"data":[{"id":"supplement_001_sample","value":100,"created_at":"2025-05-19T14:30:00Z"},{"id":"supplement_002_sample","value":50,"created_at":"2025-05-20T09:15:00Z"}]};
}
