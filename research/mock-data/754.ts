
import Component from "../components/754";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"sha":"f0e1d2c3b4a5968778695a4b3c2d1e0f98765432","url":"https://api.example.com/repos/example-org/sample-repo/git/trees/f0e1d2c3b4a5968778695a4b3c2d1e0f98765432","truncated":false,"tree":[{"path":"src/index.js","mode":"100644","type":"blob","sha":"a1b2c3d4e5f60718293a4b5c6d7e8f9012345678","size":512,"url":"https://api.example.com/repos/example-org/sample-repo/git/blobs/a1b2c3d4e5f60718293a4b5c6d7e8f9012345678"},{"path":"src/components","mode":"040000","type":"tree","sha":"1234abcd5678ef901234abcd5678ef901234abcd","url":"https://api.example.com/repos/example-org/sample-repo/git/trees/1234abcd5678ef901234abcd5678ef901234abcd"},{"path":"README.md","mode":"100644","type":"blob","sha":"fedcba9876543210fedcba9876543210fedcba98","size":256}]};
}
