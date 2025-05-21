
import Component from "../components/804";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"name":"LICENSE","path":"LICENSE","sha":"e3b0c44298fc1c149afbf4c8996fb92427ae41e4","size":1152,"url":"https://api.example.com/repos/example-org/sample-repo/license","html_url":"https://www.example.com/example-org/sample-repo/blob/main/LICENSE","git_url":"https://api.example.com/repos/example-org/sample-repo/git/blobs/e3b0c44298fc1c149afbf4c8996fb92427ae41e4","download_url":"https://raw.example.com/example-org/sample-repo/main/LICENSE","type":"file","content":"Q29weXJpZ2h0IChjKSAyMDI1IEV4YW1wbGUgUmVwb3MsIElmIHRoZSBsaWNlbnNlIHBlcm1pdHMgdXNlIGFuZCBkaXN0cmlidXRpb24sIGl0IGlzIHJlc2VuaGlibGUgYXMgTUlULgo=","encoding":"base64","_links":{"git":"https://api.example.com/repos/example-org/sample-repo/git/blobs/e3b0c44298fc1c149afbf4c8996fb92427ae41e4","html":"https://www.example.com/example-org/sample-repo/blob/main/LICENSE","self":"https://api.example.com/repos/example-org/sample-repo/license"},"license":{"key":"mit","name":"MIT License (Sample)","url":"https://example.org/licenses/MIT","spdx_id":"MIT","node_id":"NODEID_License_MIT_ABC123","html_url":"https://example.com/licenses/MIT"}};
}
