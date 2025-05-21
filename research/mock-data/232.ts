
import Component from "../components/232";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"prev":"cursor_prev_test123","next":"cursor_next_test456","events":[{"userId":"user_test_001","id":"evt_1001","channelId":"channel_alpha","name":"UserSignup (Sample Event)","property":{"plan":{},"referral":{}},"createdAt":1732070400,"expireAt":1734662400,"managed":false,"version":1,"nameI18nMap":{"en":"User Signup (Sample)","ko":"사용자 가입 (샘플)"}},{"name":"PasswordResetRequested (Test)","managed":true,"version":2}]};
}
