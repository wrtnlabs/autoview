
import Component from "../components/888";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"name":"v1.0.0-test","commit":{"sha":"abc123def4567890abc123def4567890abc123de","url":"https://api.example.org/repos/sample-org/sample-repo/commits/abc123def4567890abc123def4567890abc123de"},"zipball_url":"https://api.example.org/repos/sample-org/sample-repo/zipball/v1.0.0-test","tarball_url":"https://api.example.org/repos/sample-org/sample-repo/tarball/v1.0.0-test","node_id":"MDM6VGFnVjEuMC4wLXRlc3Q="},{"name":"release-2.0.0-sample","commit":{"sha":"f0e1d2c3b4a5968778695a4b3c2d1e0f98765432","url":"https://api.example.org/repos/sample-org/sample-repo/commits/f0e1d2c3b4a5968778695a4b3c2d1e0f98765432"},"zipball_url":"https://api.example.org/repos/sample-org/sample-repo/zipball/release-2.0.0-sample","tarball_url":"https://api.example.org/repos/sample-org/sample-repo/tarball/release-2.0.0-sample","node_id":"MDM6VGFncmVsZWFzZS0yLjAuMC1zYW1wbGU="}];
}
