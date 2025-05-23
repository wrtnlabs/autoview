
import Component from "../components/982";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"key":"ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIJKLMockSampleKeyDataXYZ1234567890 user@example.com","id":31415,"title":"Test SSH Signing Key (Sample)","created_at":"2025-05-19T15:30:00Z"};
}
