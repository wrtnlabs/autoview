
import Component from "../components/252";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"oneTimeMsgUser":{"oneTimeMsgId":"otm_test_msg_001","userId":"user_test_123","sent":150,"view":120,"goal":200,"click":25,"version":1,"id":"sample_record_id_001"}};
}
