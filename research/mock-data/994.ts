
import Component from "../components/994";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":42,"name":"Test GPG Key (Sample)","primary_key_id":null,"key_id":"ABCD1234EFGH5678","public_key":"-----BEGIN PGP PUBLIC KEY BLOCK-----\nVersion: GnuPG v2 (Sample)\n\nmQENBF1234ABCD5678EFGH test.user@example.com\n-----END PGP PUBLIC KEY BLOCK-----","emails":[{"email":"test.user@example.com","verified":true},{"email":"sample.bot@example.org","verified":false}],"subkeys":[{"id":43,"primary_key_id":42,"key_id":"1234ABCD5678EFGH","public_key":"-----BEGIN PGP PUBLIC KEY BLOCK-----\nVersion: GnuPG v2 (Sample Subkey)\n\nmQENBFSUBKEY123ABCD test.subkey@example.com\n-----END PGP PUBLIC KEY BLOCK-----","emails":[{"email":"test.subkey@example.com","verified":true}],"subkeys":[],"can_sign":true,"can_encrypt_comms":true,"can_encrypt_storage":false,"can_certify":false,"created_at":"2025-06-01T09:15:00Z","expires_at":null,"raw_key":null,"revoked":false}],"can_sign":true,"can_encrypt_comms":true,"can_encrypt_storage":true,"can_certify":true,"created_at":"2025-05-19T14:30:00Z","expires_at":"2026-05-19T14:30:00Z","revoked":false,"raw_key":null}];
}
