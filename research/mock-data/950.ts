
import Component from "../components/950";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":42,"name":"Sample GPG Key (Test)","primary_key_id":123456,"key_id":"4A1B2C3D4E5F6G7H","public_key":"-----BEGIN PGP PUBLIC KEY BLOCK-----\nVersion: GnuPG v2 (Test)\n\nmQENBF_SAMPLEKEYDATA12345XYZ67890\n=TEST\n-----END PGP PUBLIC KEY BLOCK-----","emails":[{"email":"test.user@example.com","verified":true},{"email":"another.user@example.org","verified":false}],"subkeys":[{"id":43,"primary_key_id":123456,"key_id":"1A2B3C4D5E6F7G8H","public_key":"-----BEGIN PGP PUBLIC KEY BLOCK-----\nVersion: GnuPG v2 (Test)\n\nmQENBF_SUBKEYDATAABCDE12345\n=SUBK\n-----END PGP PUBLIC KEY BLOCK-----","emails":[{"email":"subkey.user@example.com","verified":true}],"subkeys":[],"can_sign":false,"can_encrypt_comms":true,"can_encrypt_storage":true,"can_certify":false,"created_at":"2025-05-19T14:30:00Z","expires_at":"2026-05-19T14:30:00Z","raw_key":null,"revoked":false}],"can_sign":true,"can_encrypt_comms":true,"can_encrypt_storage":false,"can_certify":true,"created_at":"2025-05-19T14:00:00Z","expires_at":"2027-05-19T14:00:00Z","revoked":false,"raw_key":"-----BEGIN PGP PRIVATE KEY BLOCK-----\nVersion: GnuPG v2 (Test)\n\nlQOYBF_SAMPLEPRIVATEKEYDATAabc123XYZ456\n=PRIV\n-----END PGP PRIVATE KEY BLOCK-----"};
}
