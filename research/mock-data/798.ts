
import Component from "../components/798";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":101,"key":"ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCy5samplekeyforUItestingOnly","url":"https://api.example.com/repos/sample-org/sample-repo/keys/101","title":"Sample Deploy Key (Test)","verified":true,"created_at":"2025-05-19T14:30:00Z","read_only":false,"added_by":"test.user@example.com","last_used":"2025-05-20T09:15:00Z","enabled":true};
}
