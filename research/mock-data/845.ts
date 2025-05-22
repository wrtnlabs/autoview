
import Component from "../components/845";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"type":"file","encoding":"utf-8","size":2345,"name":"sample-file.txt","path":"docs/sample-file.txt","content":"Sample file content for UI testing purposes.\nLine two of sample content.","sha":"3a6eb7c8d9f0a1b2c3d4e5f67890ab1c2d3e4f5a","url":"https://api.example.com/repos/example-org/sample-repo/contents/docs/sample-file.txt","git_url":"https://api.example.com/repos/example-org/sample-repo/git/blobs/3a6eb7c8d9f0a1b2c3d4e5f67890ab1c2d3e4f5a","html_url":"https://www.example.com/example-org/sample-repo/blob/main/docs/sample-file.txt","download_url":"https://raw.example.com/example-org/sample-repo/main/docs/sample-file.txt","_links":{"git":"https://api.example.com/repos/example-org/sample-repo/git/blobs/3a6eb7c8d9f0a1b2c3d4e5f67890ab1c2d3e4f5a","html":"https://www.example.com/example-org/sample-repo/blob/main/docs/sample-file.txt","self":"https://api.example.com/repos/example-org/sample-repo/contents/docs/sample-file.txt"},"target":"main","submodule_git_url":"https://git.example.com/example-org/sample-submodule.git"};
}
