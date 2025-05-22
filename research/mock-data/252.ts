
import Component from "../components/252";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"oneTimeMsgUser":{"oneTimeMsgId":"sample_onetime_msg_001","userId":"user_test_123","sent":150,"view":120,"goal":200,"click":45,"version":1,"id":"sample-onetime-msg-user-id-001"}};
}
