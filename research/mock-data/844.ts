
import Component from "../components/844";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"type":"file","encoding":"base64","size":1024,"name":"sample.txt","path":"docs/sample.txt","content":"VGhpcyBpcyBhIHRlc3Qgc2FtcGxlIGZpbGUgY29udGVudC4=","sha":"3d21ec53a331a6f037a91c368710b99387d012c1","url":"https://api.example.com/v1/repos/example-org/sample-repo/contents/docs/sample.txt","git_url":"https://api.example.com/v1/repos/example-org/sample-repo/git/blobs/3d21ec53a331a6f037a91c368710b99387d012c1","html_url":"https://www.example.com/repos/example-org/sample-repo/blob/main/docs/sample.txt","download_url":"https://raw.example.com/repos/example-org/sample-repo/main/docs/sample.txt","_links":{"git":"https://api.example.com/v1/repos/example-org/sample-repo/git/blobs/3d21ec53a331a6f037a91c368710b99387d012c1","html":"https://www.example.com/repos/example-org/sample-repo/blob/main/docs/sample.txt","self":"https://api.example.com/v1/repos/example-org/sample-repo/contents/docs/sample.txt"},"target":"refs/heads/sample-branch"};
}
