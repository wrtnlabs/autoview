
import Component from "../components/956";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"key":"ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC7SampleKeyData user@example.com","id":101,"url":"https://api.example.com/v1/test-keys/101","title":"Sample Deploy Key (Test)","created_at":"2025-05-19T14:30:00Z","verified":true,"read_only":false},{"key":"ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIKSampleKeyDataSecondTest user2@example.org","id":102,"url":"https://api.example.com/v1/test-keys/102","title":"Backup Key (Sample)","created_at":"2025-05-18T09:15:00Z","verified":false,"read_only":true},{"key":"ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDtThirdSampleKeyData user3@example.net","id":103,"url":"https://api.example.com/v1/test-keys/103","title":"Tertiary Key Dummy","created_at":"2025-05-17T21:45:30Z","verified":true,"read_only":true}];
}
