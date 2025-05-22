
import Component from "../components/501";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"key_id":"test_key_id_001","key":"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEASampleDummyPublicKeyBase64=="};
}
