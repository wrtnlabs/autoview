
import Component from "../components/755";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"sha":"f0e1d2c3b4a5968778695a4b3c2d1e0f98765432","url":"https://api.example.com/repos/example-org/sample-repo/git/trees/f0e1d2c3b4a5968778695a4b3c2d1e0f98765432","truncated":false,"tree":[{"path":"src/index.js","mode":"100644","type":"blob","sha":"a1b2c3d4e5f678901234567890abcdef12345678","size":345,"url":"https://api.example.com/repos/example-org/sample-repo/git/blobs/a1b2c3d4e5f678901234567890abcdef12345678"},{"path":"src/components/MockComponent.jsx","mode":"100644","type":"blob","sha":"b2c3d4e5f678901234567890abcdef1234567890ab","size":789,"url":"https://api.example.com/repos/example-org/sample-repo/git/blobs/b2c3d4e5f678901234567890abcdef1234567890ab"},{"path":"docs/","mode":"040000","type":"tree","sha":"c3d4e5f678901234567890abcdef1234567890abc","url":"https://api.example.com/repos/example-org/sample-repo/git/trees/c3d4e5f678901234567890abcdef1234567890abc"}]};
}
