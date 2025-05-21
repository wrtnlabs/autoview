
import Component from "../components/844";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"type":"file","encoding":"base64","size":2048,"name":"sample.txt","path":"docs/sample.txt","content":"SGVsbG8gU2FtcGxlIGNvbnRlbnQhCg==","sha":"3f786850e387550fdab836ed7e6dc881de23001b","url":"https://api.example.com/repos/sample-repo/contents/docs/sample.txt","git_url":"https://git.example.com/repos/sample-repo/git/blobs/3f786850e387550fdab836ed7e6dc881de23001b","html_url":"https://www.example.com/repos/sample-repo/blob/main/docs/sample.txt","download_url":"https://www.example.com/repos/sample-repo/raw/main/docs/sample.txt","_links":{"git":"https://git.example.com/repos/sample-repo/git/blobs/3f786850e387550fdab836ed7e6dc881de23001b","html":"https://www.example.com/repos/sample-repo/blob/main/docs/sample.txt","self":"https://api.example.com/repos/sample-repo/contents/docs/sample.txt"},"target":"symlink-sample-target","submodule_git_url":"https://git.example.com/repos/sample-repo/git/modules/sample-submodule"};
}
