
import Component from "../components/9";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"pagination":{"current":1,"limit":2,"records":3,"pages":2},"data":[{"id":"a3bb189e-8bf9-3888-9912-ace4e6543002","created_at":"2025-04-10T09:15:00Z","code":"DEP-TEST-001","source":"Sample ATM Deposit","direction":1},{"id":"b6cc199e-1cf9-4888-9912-fde4e6543011","created_at":"2025-04-12T14:45:30Z","code":"WD-SAMPLE-002","source":"Online Transfer (Test)","direction":-1}]};
}
