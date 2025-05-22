
import Component from "../components/797";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":101,"key":"ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDm4K4s7ZxN5gHEvVbYkplHQpE6fZqYlzFjvYHexampleFAKEKEYforTestingPurposesOnly== test-key@example.com","url":"https://api.example.com/repos/example-org/sample-repo/deploy-keys/101","title":"Sample Deploy Key (Test)","verified":true,"created_at":"2025-05-18T09:30:00Z","read_only":false,"added_by":"deploy-key-bot-sample@example.org","last_used":"2025-05-19T12:45:00Z","enabled":true};
}
