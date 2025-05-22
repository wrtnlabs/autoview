
import Component from "../components/796";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"key":"ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQD3f1e2d3c4b5a6SampleTestKey DummyDeployKey","url":"https://api.example.com/repos/sample-org/sample-repo/keys/101","title":"CI Deploy Key (Sample)","verified":true,"created_at":"2025-05-18T12:34:56Z","read_only":true,"added_by":"test.user@example.com","last_used":"2025-05-19T08:15:30Z","enabled":true},{"id":202,"key":"ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIEsampletestkeyforUIComponentsExample","url":"https://api.example.com/repos/sample-org/sample-repo/keys/202","title":"Read-Only Deploy Key Dummy","verified":false,"created_at":"2025-05-17T09:00:00Z","read_only":false,"added_by":null,"last_used":null}];
}
