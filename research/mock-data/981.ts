
import Component from "../components/981";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"key":"ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIMockPublicKeyDataSampleOnly test@example.com","id":101,"title":"Sample SSH Signing Key (Test)","created_at":"2025-05-19T14:30:00Z"};
}
