
import Component from "../components/623";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"attestations":[{"repository_id":1001,"bundle_url":"https://api.example.com/v1/repos/1001/attestations/bundle","bundle":{"mediaType":"application/vnd.dev.sigstore.bundle+json;version=0.1","verificationMaterial":{"certificate":"-----BEGIN CERTIFICATE-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtestCertificateData\n-----END CERTIFICATE-----"},"dsseEnvelope":{"payloadType":"application/vnd.in-toto+json","payload":"eyJzdWJqZWN0IjogInNhbXBsZSJ9","signatures":[{"sig":"MEQCIFakeSignatureValueForTestPurposesOnly","keyid":"test-key-id-123"}]}}},{"repository_id":1002}]};
}
