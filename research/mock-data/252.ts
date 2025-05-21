
import Component from "../components/252";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"oneTimeMsgUser":{"oneTimeMsgId":"otm_001_sample","userId":"user_001_sample","sent":150,"view":120,"goal":200,"click":30,"version":1,"id":"sample-otmuser-001"}};
}
