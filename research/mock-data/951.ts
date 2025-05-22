
import Component from "../components/951";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":42,"name":"Test GPG Key (Sample)","primary_key_id":null,"key_id":"0A1B2C3D4E","public_key":"-----BEGIN PGP PUBLIC KEY BLOCK-----\nVersion: TestGPG 1.0 (Test)\nComment: This is a sample public key block for UI testing.\n-----END PGP PUBLIC KEY BLOCK-----","emails":[{"email":"test.user@example.com","verified":true},{"email":"dummy.secondary@example.org","verified":false}],"subkeys":[{"id":43,"primary_key_id":42,"key_id":"1B2C3D4E5F","public_key":"-----BEGIN PGP PUBLIC KEY BLOCK-----\nVersion: TestGPG 1.0 (Test Subkey)\nComment: Sample subkey for UI testing.\n-----END PGP PUBLIC KEY BLOCK-----","emails":[{"email":"subkey.user@example.com","verified":true}],"subkeys":[],"can_sign":false,"can_encrypt_comms":true,"can_encrypt_storage":true,"can_certify":false,"created_at":"2025-05-19T15:00:00Z","expires_at":null,"raw_key":null,"revoked":false}],"can_sign":true,"can_encrypt_comms":true,"can_encrypt_storage":false,"can_certify":true,"created_at":"2025-05-19T14:30:00Z","expires_at":"2026-05-19T14:30:00Z","revoked":false,"raw_key":null};
}
