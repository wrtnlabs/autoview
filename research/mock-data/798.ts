
import Component from "../components/798";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":1357,"key":"ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDfTZ8s7PQexampleKeyData1234567890abcdefghijklmnopqrstuvwx test-key-sample","url":"https://api.example.com/repos/example-org/sample-repo/keys/1357","title":"Sample Deploy Key (Test)","verified":false,"created_at":"2025-05-17T08:30:00Z","read_only":true,"added_by":"test.user@example.com","last_used":"2025-05-18T12:00:00Z","enabled":true};
}
