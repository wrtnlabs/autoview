
import Component from "../components/982";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"key":"ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC7ZTkxRXhBbXBsZURhdGFTYW1wbGVLZXlGb3JUZXN0 test-user@example.com (Test SSH Signing Key)","id":98765,"title":"Sample SSH Signing Key (Test)","created_at":"2025-05-19T14:30:00Z"};
}
