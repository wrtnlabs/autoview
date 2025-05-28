
import Component from "../components/196";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"oneTimeMsgUser":{"oneTimeMsgId":"otm_001_TEST","userId":"user_sample_123","sent":250,"view":180,"goal":75,"click":20,"version":1,"id":"record_001_SAMPLE"}};
}
