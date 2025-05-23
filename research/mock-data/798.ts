
import Component from "../components/798";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":101,"key":"ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQD3SampleBase64KeyDataOnlyForTesting sample-key-test@example.com","url":"https://api.github.com/repos/example-org/sample-repo/keys/101","title":"Sample Deploy Key (Test)","verified":true,"created_at":"2025-05-19T14:30:00Z","read_only":true,"added_by":"ci-bot@example.com","last_used":"2025-06-01T08:15:30Z","enabled":true};
}
