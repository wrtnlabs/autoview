
import Component from "../components/980";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"key":"ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAICfakeBase64Alpha1234567890abcdefghijklmnopqrstuv test-key-alpha (Test)","id":101,"title":"Test SSH Signing Key Alpha","created_at":"2025-05-19T09:15:00Z"},{"key":"ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDfakeBase64Beta0987654321ABCDEFGHIJKLMNOPQRSTUV test-key-beta (Sample)","id":202,"title":"Sample SSH Signing Key Beta","created_at":"2025-05-18T16:45:30Z"}];
}
