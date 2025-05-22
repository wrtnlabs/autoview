
import Component from "../components/755";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"sha":"abcdef1234567890abcdef1234567890abcdef12","url":"https://api.example.com/repos/example-org/sample-repo/git/trees/abcdef1234567890abcdef1234567890abcdef12","truncated":false,"tree":[{"path":"src/index.ts","mode":"100644","type":"blob","sha":"f0e1d2c3b4a5968778695a4b3c2d1e0f98765432","size":347,"url":"https://api.example.com/repos/example-org/sample-repo/git/blobs/f0e1d2c3b4a5968778695a4b3c2d1e0f98765432"},{"path":"lib/utils/helper.ts","mode":"100644","type":"blob","sha":"a1b2c3d4e5f67890123456789abcdef012345678","size":128,"url":"https://api.example.com/repos/example-org/sample-repo/git/blobs/a1b2c3d4e5f67890123456789abcdef012345678"},{"path":"docs","mode":"040000","type":"tree","sha":"d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a98765432","url":"https://api.example.com/repos/example-org/sample-repo/git/trees/d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a98765432"}]};
}
