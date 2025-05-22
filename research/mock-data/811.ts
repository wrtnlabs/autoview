
import Component from "../components/811";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":1,"node_id":"NODEID_Label_bug_abc123XYZ=","url":"https://api.github.com/repos/example-org/sample-repo/labels/bug","name":"bug","description":"A sample description for the bug label. It indicates issues that need to be investigated (Test).","color":"d73a4a","default":true},{"id":2,"node_id":"NODEID_Label_enh_abc456DEF=","url":"https://api.github.com/repos/example-org/sample-repo/labels/enhancement","name":"enhancement","description":null,"color":"a2eeef","default":false},{"id":3,"node_id":"NODEID_Label_docs_abc789GHI=","url":"https://api.github.com/repos/example-org/sample-repo/labels/documentation","name":"documentation","description":"A sample description for documentation tasks, used to track updates to project docs (Test).","color":"0075ca","default":false}];
}
