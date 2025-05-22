
import Component from "../components/623";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"attestations":[{"bundle":{"mediaType":"application/vnd.test.sigstore.bundle+json;version=0.1","verificationMaterial":{"cert":"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtestCertDataSample","format":"X.509 (Test)"},"dsseEnvelope":{"payload":"ZGF0YV9zYW1wbGVfcGF5bG9hZA==","payloadType":"application/vnd.test.dsse.samples+json"}},"repository_id":1001,"bundle_url":"https://api.example.org/repos/example-org/sample-repo/attestations/attestation-1001.bundle"},{"repository_id":1002}]};
}
