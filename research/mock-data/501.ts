
import Component from "../components/501";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"key_id":"sample-key-001","key":"MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAMc2FtcGxlLXB1YmxpYy1rZXktZGF0YS1zYW1wbGUtYWJjMTIzMTIzIDAQAB"};
}
