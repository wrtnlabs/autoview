
import Component from "../components/980";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"key":"ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDexampleTestKeyStringEXAMPLE user@example.com","id":101,"title":"Test SSH Signing Key (Sample 1)","created_at":"2025-05-19T14:30:00Z"},{"key":"ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIexampleAnotherTestKeyStringEXAMPLE user@example.org","id":102,"title":"Dummy SSH Signing Key (Sample 2)","created_at":"2025-05-18T09:15:30Z"}];
}
