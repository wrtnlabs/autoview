
import Component from "../components/754";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"sha":"f0e1d2c3b4a5968778695a4b3c2d1e0f98765432","url":"https://api.example.com/repos/example-org/sample-repo/git/trees/f0e1d2c3b4a5968778695a4b3c2d1e0f98765432","truncated":false,"tree":[{"path":"README.md","mode":"100644","type":"blob","sha":"c3d2b1a098f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3","size":345,"url":"https://api.example.com/repos/example-org/sample-repo/git/blobs/c3d2b1a098f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3"},{"path":"src","mode":"040000","type":"tree","sha":"a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0","url":"https://api.example.com/repos/example-org/sample-repo/git/trees/a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0"},{"path":"src/index.js","mode":"100644","type":"blob","sha":"d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3","size":512}]};
}
