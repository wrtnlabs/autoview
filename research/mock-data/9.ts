
import Component from "../components/9";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"pagination":{"current":1,"limit":10,"records":3,"pages":1},"data":[{"id":"e8b5a51d-1234-4f67-89ab-0f12cd34ef56","created_at":"2025-05-18T09:15:00Z","code":"DEP-0001-SAMPLE","source":"InternalTransfer (Sample)","direction":1},{"id":"9c77d2a3-5678-4abc-9def-12ab34cd56ef","created_at":"2025-05-18T12:45:30Z","code":"DEP-0002-SAMPLE","source":"ExternalDeposit_Test","direction":1},{"id":"ab12cd34-ef56-4789-abcd-ef1234567890","created_at":"2025-05-19T08:00:00Z","code":"DEP-0003-SAMPLE","source":"WireTransfer-Sample","direction":-1}]};
}
