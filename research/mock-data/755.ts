
import Component from "../components/755";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"sha":"ab12cd34ef56ab78cd90ef12ab34cd56ef78ab90","url":"https://api.example.com/repos/sample-org/sample-repo/git/trees/ab12cd34ef56ab78cd90ef12ab34cd56ef78ab90","truncated":false,"tree":[{"path":"src/index.js","mode":"100644","type":"blob","sha":"f1e2d3c4b5a697887766554433221100ffeeddcc","size":523,"url":"https://api.example.com/repos/sample-org/sample-repo/git/blobs/f1e2d3c4b5a697887766554433221100ffeeddcc"},{"path":"src/utils/helper.js","mode":"100644","type":"blob","sha":"deadbeef1234567890abcdef1234567890abcdef","size":234,"url":"https://api.example.com/repos/sample-org/sample-repo/git/blobs/deadbeef1234567890abcdef1234567890abcdef"},{"path":"docs","mode":"040000","type":"tree","sha":"abc123def456abc789def012abc345def6789012","url":"https://api.example.com/repos/sample-org/sample-repo/git/trees/abc123def456abc789def012abc345def6789012"}]};
}
