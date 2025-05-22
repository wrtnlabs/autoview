
import Component from "../components/703";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"name":"feature/sample-ui-update","commit":{"sha":"f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0","url":"https://api.example.com/repos/sample-org/sample-repo/commits/f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0"},"protected":false},{"name":"release/v1.2.0-test","commit":{"sha":"0a9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a10","url":"https://api.example.com/repos/sample-org/sample-repo/commits/0a9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a10"},"protected":true}];
}
