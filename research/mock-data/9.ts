
import Component from "../components/9";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"pagination":{"current":1,"limit":2,"records":5,"pages":3},"data":[{"id":"d290f1ee-6c54-4b01-90e6-d701748f0851","created_at":"2025-05-19T08:23:15Z","code":"DEP-SAMPLE-001","source":"web_portal_test","direction":1},{"id":"3fa85f64-5717-4562-b3fc-2c963f66afa6","created_at":"2025-05-18T16:45:00Z","code":"DEP-SAMPLE-002-REVERSAL","source":"atm_machine_dummy","direction":-1}]};
}
