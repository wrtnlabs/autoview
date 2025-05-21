
import Component from "../components/628";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"name":"feature/sample-A","commit":{"sha":"d1e2f3a4b5c6d7e8f9a0b1c2d3e4f567890abcdef","url":"https://api.example.com/repos/example-org/sample-repo/commits/d1e2f3a4b5c6d7e8f9a0b1c2d3e4f567890abcdef"},"protected":false},{"name":"main-test","commit":{"sha":"f0e1d2c3b4a5968778695a4b3c2d1e0f98765432","url":"https://api.example.com/repos/example-org/sample-repo/commits/f0e1d2c3b4a5968778695a4b3c2d1e0f98765432"},"protected":true,"protection":{"url":"https://api.example.com/repos/example-org/sample-repo/branches/main-test/protection","enabled":true},"protection_url":"https://api.example.com/repos/example-org/sample-repo/branches/main-test/protection"}];
}
