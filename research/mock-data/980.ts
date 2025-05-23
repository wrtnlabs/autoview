
import Component from "../components/980";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"key":"ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC3fakekeydataforuputestingonly user@example.com","id":101,"title":"Sample SSH Signing Key (Test)","created_at":"2025-05-19T14:30:00Z"},{"key":"ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIJfakeed25519keyforuisampleonly test-user@example.org","id":102,"title":"Backup SSH Signing Key (Test)","created_at":"2025-05-20T09:15:30Z"}];
}
