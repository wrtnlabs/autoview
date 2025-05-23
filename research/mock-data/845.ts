
import Component from "../components/845";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"type":"file","encoding":"base64","size":2048,"name":"sample.txt","path":"docs/sample.txt","content":"U2FtcGxlIHRleHQgY29udGVudCBmb3IgdGVzdGluZy4K","sha":"f1e2d3c4b5a697887766554433221100ffeeddcc","url":"https://api.example.com/repos/example-org/sample-repo/contents/docs/sample.txt","git_url":"https://api.example.com/repos/example-org/sample-repo/git/blobs/f1e2d3c4b5a697887766554433221100ffeeddcc","html_url":"https://www.example.com/example-org/sample-repo/blob/main/docs/sample.txt","download_url":"https://raw.example.com/example-org/sample-repo/main/docs/sample.txt","_links":{"git":"https://api.example.com/repos/example-org/sample-repo/git/blobs/f1e2d3c4b5a697887766554433221100ffeeddcc","html":"https://www.example.com/example-org/sample-repo/blob/main/docs/sample.txt","self":"https://api.example.com/repos/example-org/sample-repo/contents/docs/sample.txt"}};
}
