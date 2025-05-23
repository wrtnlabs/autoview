
import Component from "../components/796";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"key":"ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC3l0nL2xYm1sampleTestKeyDataExample root@test","url":"https://api.github.com/repos/example-org/sample-repo/keys/101","title":"Sample Deploy Key Alpha (Test)","verified":true,"created_at":"2025-05-19T14:30:00Z","read_only":true,"added_by":"test.user@example.com","last_used":"2025-05-20T09:15:30Z","enabled":true},{"id":102,"key":"ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIBsampleKeyDataAnotherTest token@sample","url":"https://api.github.com/repos/example-org/sample-repo/keys/102","title":"Sample Deploy Key Beta (Test)","verified":false,"created_at":"2025-05-17T08:25:00Z","read_only":false}];
}
