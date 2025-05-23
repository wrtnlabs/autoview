
import Component from "../components/292";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"result":true,"code":1000,"requestToResponse":"req_map_sample_56789","data":["Option A (Sample)","Option B (Sample)","Option C (Sample)"]};
}
