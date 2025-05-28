
import Component from "../components/754";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"sha":"f0e1d2c3b4a5968778695a4b3c2d1e0f98765432","url":"https://api.example.com/repos/example-org/sample-repo/git/trees/f0e1d2c3b4a5968778695a4b3c2d1e0f98765432","truncated":false,"tree":[{"path":"src/index.js","mode":"100644","type":"blob","sha":"a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f89012","size":345,"url":"https://api.example.com/repos/example-org/sample-repo/git/blobs/a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f89012"},{"path":"src/utils","mode":"040000","type":"tree","sha":"d6c5b4a3e2f1d0c9b8a7e6f5d4c3b2a1c0beef01","url":"https://api.example.com/repos/example-org/sample-repo/git/trees/d6c5b4a3e2f1d0c9b8a7e6f5d4c3b2a1c0beef01"},{"path":"README.md","mode":"100644","type":"blob","sha":"123456abcdef7890abcdef1234567890abcdef12","size":1024}]};
}
