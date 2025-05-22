
import Component from "../components/796";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"key":"ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCy5ampleFakeKeyStringForUITestingDummyData","url":"https://api.github.com/repos/example-org/sample-repo/keys/101","title":"Sample Deploy Key (Test)","verified":true,"created_at":"2025-05-19T14:30:00Z","read_only":false,"added_by":"test.user@example.com","last_used":"2025-05-18T12:00:00Z","enabled":true},{"id":202,"key":"ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIEFakeSampleKeyForTestingOnly","url":"https://api.github.com/repos/example-org/sample-repo/keys/202","title":"Read-Only Deploy Key (Sample)","verified":false,"created_at":"2024-01-15T09:20:00Z","read_only":true}];
}
