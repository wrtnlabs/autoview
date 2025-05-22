
import Component from "../components/797";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":42,"key":"ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC0eXhhbXBsZS1kYXRhLWZvci10ZXN0LXNzaC1rZXktc2FtcGxlIHN0cnVuZwo=","url":"https://api.example.com/repos/sample-repo/keys/42","title":"Sample Deploy Key (Test)","verified":false,"created_at":"2025-05-19T14:30:00Z","read_only":true,"added_by":"sample-uploader (Test)","last_used":"2025-06-01T09:15:30Z","enabled":true};
}
