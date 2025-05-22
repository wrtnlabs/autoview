
import Component from "../components/1011";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"key":"ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIKJHFakePublicKeyString1234567890AZSample user@example.com","id":101,"title":"Primary Test SSH Signing Key","created_at":"2025-05-19T15:45:00Z"},{"key":"ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDfakeRsaPublicKeyKeyDataSample98765XYZ user@example.com","id":102,"title":"Backup SSH Signing Key (Sample)","created_at":"2025-06-01T09:30:00Z"}];
}
