
import Component from "../components/443";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"key_id":"test-key-id-12345","key":"MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC4vL8gPyFfZJT3+SampleKeyData+MoreData=="};
}
