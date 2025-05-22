
import Component from "../components/196";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"oneTimeMsgUser":{"oneTimeMsgId":"msg_12345_test","userId":"user_67890_sample","sent":150,"view":120,"goal":100,"click":30,"version":1,"id":"otmu_abc123_test"}};
}
