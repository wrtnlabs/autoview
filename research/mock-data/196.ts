
import Component from "../components/196";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"oneTimeMsgUser":{"oneTimeMsgId":"otm_sample_001","userId":"user_sample_001","sent":250,"view":240,"goal":300,"click":50,"version":1,"id":"otmu_123_test"}};
}
