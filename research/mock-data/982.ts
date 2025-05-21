
import Component from "../components/982";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"key":"ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIL5zE3KcYgHJ3ZGF0YU5vdGhpbmdGb3JLZXRNZXNzYWdlVGVzdA== test-key@example.com","id":67890,"title":"Sample SSH Signing Key (Test)","created_at":"2025-05-19T14:30:00Z"};
}
