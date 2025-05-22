
import Component from "../components/845";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"type":"file","encoding":"base64","size":1024,"name":"sample-file.txt","path":"docs/sample-file.txt","content":"VGhpcyBpcyBhIHNhbXBsZSBmaWxlIGNvbnRlbnQuIChUaGlzIGlzIGZvciB0ZXN0aW5nKS4=","sha":"3b82c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0","url":"https://api.example.com/repos/sample-org/sample-repo/contents/docs/sample-file.txt","git_url":"https://git.example.com/repos/sample-org/sample-repo/git/blobs/3b82c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0","html_url":"https://www.example.com/sample-org/sample-repo/blob/main/docs/sample-file.txt","download_url":"https://raw.example.com/sample-org/sample-repo/main/docs/sample-file.txt","_links":{"git":"https://git.example.com/repos/sample-org/sample-repo/git/blobs/3b82c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0","html":"https://www.example.com/sample-org/sample-repo/blob/main/docs/sample-file.txt","self":"https://api.example.com/repos/sample-org/sample-repo/contents/docs/sample-file.txt"}};
}
