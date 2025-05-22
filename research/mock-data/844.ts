
import Component from "../components/844";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"type":"file","encoding":"base64","size":1024,"name":"sample-config.json","path":"configs/sample-config.json","content":"eyJrZXkiOiAidmFsdWUiLCAibGlzdCI6IFsxLCAyLCAzXX0=","sha":"f0e1d2c3b4a5968778695a4b3c2d1e0f98765432","url":"https://api.example.com/repos/example-org/sample-repo/contents/configs/sample-config.json","git_url":"https://api.example.com/repos/example-org/sample-repo/git/blobs/f0e1d2c3b4a5968778695a4b3c2d1e0f98765432","html_url":"https://www.example.com/example-org/sample-repo/blob/main/configs/sample-config.json","download_url":"https://download.example.com/repos/example-org/sample-repo/raw/main/configs/sample-config.json","_links":{"git":"https://api.example.com/repos/example-org/sample-repo/git/blobs/f0e1d2c3b4a5968778695a4b3c2d1e0f98765432","html":"https://www.example.com/example-org/sample-repo/blob/main/configs/sample-config.json","self":"https://api.example.com/repos/example-org/sample-repo/contents/configs/sample-config.json"},"target":"f0e1d2c3b4a5968778695a4b3c2d1e0f98765432","submodule_git_url":"https://api.example.com/repos/example-org/sample-repo/git/modules/sample-config"};
}
