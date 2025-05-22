
import Component from "../components/951";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":101,"name":"Sample GPG Key (Test)","primary_key_id":1001,"key_id":"A1B2C3D4E5F67890","public_key":"-----BEGIN PGP PUBLIC KEY BLOCK-----\nVersion: GnuPG v2.2.20 (Sample)\n\nmQENBFiZmP4BCAC3mkutYW1wbGxlLXNlcnZlciBwdWJsaWMga2V5IGRhdGEgZm9yIHRlc3QgaW5zdGFuY2UgZG9jdW1lbnRhdGlvbi4uLg...IDAQAB\n=xyz1\n-----END PGP PUBLIC KEY BLOCK-----","emails":[{"email":"test.user@example.com","verified":true},{"email":"other.user@example.org","verified":false}],"subkeys":[{"id":102,"primary_key_id":101,"key_id":"B1C2D3E4F5A69780","public_key":"-----BEGIN PGP PUBLIC KEY BLOCK-----\nVersion: GnuPG v2.2.20 (Sample Subkey)\n\nmQENBFjZ...subkeydata...IDAQAB\n=abcd\n-----END PGP PUBLIC KEY BLOCK-----","emails":[{"email":"test.user@example.com","verified":true}],"subkeys":[],"can_sign":true,"can_encrypt_comms":true,"can_encrypt_storage":false,"can_certify":false,"created_at":"2025-05-01T12:00:00Z","expires_at":"2027-05-01T12:00:00Z","raw_key":null,"revoked":false}],"can_sign":true,"can_encrypt_comms":true,"can_encrypt_storage":true,"can_certify":false,"created_at":"2023-01-15T08:30:00Z","expires_at":null,"revoked":false,"raw_key":null};
}
