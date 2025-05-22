
import Component from "../components/703";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"name":"main-test","commit":{"sha":"f0e1d2c3b4a5968778695a4b3c2d1e0f98765432","url":"https://api.example.com/repos/example-org/sample-repo/commits/f0e1d2c3b4a5968778695a4b3c2d1e0f98765432"},"protected":true},{"name":"feature/sample-login (Test)","commit":{"sha":"a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0","url":"https://api.example.com/repos/example-org/sample-repo/commits/a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0"},"protected":false},{"name":"release/v1.0.0-sample","commit":{"sha":"0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9c","url":"https://api.example.com/repos/example-org/sample-repo/commits/0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9c"},"protected":true}];
}
