
import Component from "../components/411";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"key_id":"actions_key_01_sample","key":"MHkwEAYHKoZIzj0CAQYFK4EEACIDYgAEXAMPLEFAKEPUBLICKEYDATA12345==","id":42,"url":"https://api.example.com/v1/actions/public-keys/actions_key_01_sample","title":"Sample Actions Public Key (Test)","created_at":"2025-05-19T14:30:00Z"};
}
