
import Component from "../components/67";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"pagination":{"current":1,"limit":10,"records":2,"pages":1},"data":[{"id":"d290f1ee-6c54-4b01-90e6-d701748f0851","citizen":{"id":"CITIZEN-001-Test","created_at":"2025-05-10T09:15:00Z","mobile":"010-5555-1234","name":"Alice Sample (Test)"},"deposit":{"id":"f47ac10b-58cc-4372-a567-0e02b2c3d479","created_at":"2025-05-10T09:16:00Z","code":"DEP-BANK-1001","source":"BankTransfer (Sample)","direction":1},"source_id":"9c858901-8a57-4fb9-9de5-27d6c6535e24","value":250,"balance":1250,"created_at":"2025-05-10T09:16:05Z"},{"id":"3fa85f64-5717-4562-b3fc-2c963f66afa6","citizen":{"id":"CITIZEN-002-Test","created_at":"2025-05-11T11:20:00Z","mobile":"010-6666-4321","name":"Bob Sample (Test)"},"deposit":{"id":"c56a4180-65aa-42ec-a945-5fd21dec0538","created_at":"2025-05-12T14:00:00Z","code":"WDL-ATM-3003","source":"ATMWithdrawal (Sample)","direction":-1},"source_id":"5a2d6f21-3b9f-4f9a-a65b-77290e6c09f4","value":100,"balance":1150,"created_at":"2025-05-12T14:00:05Z"}]};
}
