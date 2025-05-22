
import Component from "../components/13";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"pagination":{"current":1,"limit":3,"records":25,"pages":9},"data":[{"id":"3fa85f64-5717-4562-b3fc-2c963f66afa6","value":150,"created_at":"2025-05-19T10:15:30Z","code":"REFERRAL_BONUS_SAMPLE","source":"referral_program_test","direction":1},{"id":"d6fae6c3-7c7a-47e8-9f3e-0d1b6a2c0001","value":null,"created_at":"2025-04-10T08:00:00Z","code":"ADJUSTMENT_DEDUCTION_TEST","source":"admin_adjustment_sample","direction":-1},{"id":"8b1d1f6a-3ec0-4f65-9c9f-123abc456def","value":200,"created_at":"2025-03-25T14:45:00Z","code":"PURCHASE_EARNED_SAMPLE","source":"online_store_sample","direction":1}]};
}
