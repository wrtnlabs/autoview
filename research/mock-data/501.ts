
import Component from "../components/501";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"key_id":"sample_public_key_id_01","key":"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtestKeySampleDataForUIDemoOnly12345=="};
}
