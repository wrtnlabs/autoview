
import Component from "../components/949";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"name":"Sample GPG Key (Test)","primary_key_id":null,"key_id":"AB12CD34","public_key":"-----BEGIN PGP PUBLIC KEY BLOCK-----\nVersion: GnuPG v2 (Test)\n\nmQENBFsamplekey1234567890abcdef\n=XYZ\n-----END PGP PUBLIC KEY BLOCK-----","emails":[{"email":"test.user@example.com","verified":true},{"email":"another_test@example.org","verified":false}],"subkeys":[{"id":102,"primary_key_id":101,"key_id":"FE34DC56","public_key":"-----BEGIN PGP PUBLIC KEY BLOCK-----\nVersion: GnuPG v2 (Test)\n\nmQENBFsubkey1234\n=SUB\n-----END PGP PUBLIC KEY BLOCK-----","emails":[{"email":"subkey.user@example.com","verified":true}],"subkeys":[],"can_sign":true,"can_encrypt_comms":true,"can_encrypt_storage":false,"can_certify":false,"created_at":"2025-02-01T09:30:00Z","expires_at":"2027-02-01T09:30:00Z","raw_key":null,"revoked":false}],"can_sign":true,"can_encrypt_comms":true,"can_encrypt_storage":true,"can_certify":false,"created_at":"2025-01-15T08:00:00Z","expires_at":null,"revoked":false,"raw_key":null}];
}
