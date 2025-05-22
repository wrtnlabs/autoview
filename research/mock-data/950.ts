
import Component from "../components/950";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":1,"name":"Test GPG Key (Sample)","primary_key_id":null,"key_id":"A1B2C3D4SAMPLE","public_key":"-----BEGIN PGP PUBLIC KEY BLOCK-----\nVersion: OpenPGP Test Suite\n\nmQENBFEz9SAMPLEKEYDATAoIDAQAB\n=ABC1\n-----END PGP PUBLIC KEY BLOCK-----","emails":[{"email":"test.user@example.com","verified":true},{"email":"sample.key@example.org","verified":false}],"subkeys":[{"id":1001,"primary_key_id":1,"key_id":"SUBKEY1234SAMPLE","public_key":"-----BEGIN PGP PUBLIC KEY BLOCK-----\nVersion: OpenPGP Test Suite\n\nlQGNBFz9SUBKEYDATA\n=SUB1\n-----END PGP PUBLIC KEY BLOCK-----","emails":[{"email":"subkey.user@example.com","verified":false}],"subkeys":[],"can_sign":false,"can_encrypt_comms":true,"can_encrypt_storage":true,"can_certify":false,"created_at":"2025-05-19T15:10:00Z","expires_at":"2025-11-19T15:10:00Z","raw_key":null,"revoked":false},{"id":1002,"primary_key_id":1,"key_id":"SUBKEY5678SAMPLE","created_at":"2025-05-19T15:15:00Z","can_sign":true,"can_encrypt_comms":false,"can_encrypt_storage":false,"can_certify":true,"revoked":false}],"can_sign":true,"can_encrypt_comms":true,"can_encrypt_storage":true,"can_certify":false,"created_at":"2025-05-19T15:00:00Z","expires_at":"2026-05-19T15:00:00Z","revoked":false,"raw_key":null};
}
