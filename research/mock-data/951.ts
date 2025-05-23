
import Component from "../components/951";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":1,"name":"Sample GPG Key (Test)","primary_key_id":null,"key_id":"0123456789ABCDEF","public_key":"-----BEGIN PGP PUBLIC KEY BLOCK-----\nVersion: TestPGP\n\nmQENBFpSample1BCAC7+fakedataSampleLine...\n-----END PGP PUBLIC KEY BLOCK-----","emails":[{"email":"test.user@example.com","verified":true}],"subkeys":[{"id":2,"primary_key_id":1,"key_id":"FEDCBA9876543210","public_key":"-----BEGIN PGP PUBLIC KEY BLOCK-----\nVersion: TestPGP\n\nmQENBFpSampleSubkeyLine...\n-----END PGP PUBLIC KEY BLOCK-----","emails":[{"email":"test.subkey@example.org","verified":false}],"subkeys":[],"can_sign":false,"can_encrypt_comms":true,"can_encrypt_storage":true,"can_certify":false,"created_at":"2025-05-19T12:15:00Z","expires_at":"2026-05-19T12:00:00Z","raw_key":null,"revoked":false}],"can_sign":true,"can_encrypt_comms":true,"can_encrypt_storage":true,"can_certify":false,"created_at":"2025-05-19T12:00:00Z","expires_at":null,"revoked":false,"raw_key":null};
}
