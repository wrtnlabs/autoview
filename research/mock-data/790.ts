
import Component from "../components/790";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"node_id":"MDU6TGFiZWwxMDE=","url":"https://api.example.com/repos/sample-org/sample-repo/labels/bug-test","name":"bug-test","description":"A sample label representing a bug or issue category for UI testing purposes.","color":"d73a4a","default":false},{"id":102,"node_id":"MDU6TGFiZWwxMDI=","url":"https://api.example.com/repos/sample-org/sample-repo/labels/enhancement-sample","name":"enhancement-sample","description":null,"color":"a2eeef","default":true}];
}
