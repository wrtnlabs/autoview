
import Component from "../components/623";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"attestations":[{"bundle":{"mediaType":"application/vnd.dev.cosign.simplesigning.v1+json","verificationMaterial":{"format":"x509","certificate":"SampleCertificateDataBase64=="},"dsseEnvelope":{"payloadType":"application/vnd.dev.cosign.simplesigning.v1+json","payload":"c2FtcGxlLWRhdGE=","signatures":[{"sig":"fake-signature-value","keyid":"test-key-id-001"}]}},"repository_id":1024,"bundle_url":"https://api.example.com/sigstore/bundles/sample-bundle-1024.json"},{"bundle":{"mediaType":"application/sample+json"},"repository_id":2048},{"repository_id":4096,"bundle_url":"https://example.org/sigstore/bundles/test-bundle-4096.json"}]};
}
