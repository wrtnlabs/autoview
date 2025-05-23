
import Component from "../components/787";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"node_id":"MDU6TGFiZWwxMDE=","url":"https://api.example.com/repos/example-org/sample-repo/labels/bug-test","name":"bug (Test)","description":"A test label for bugs in sample repositories. This is dummy data for UI testing.","color":"d73a4a","default":false},{"id":102,"node_id":"MDU6TGFiZWwxMDI=","url":"https://api.example.com/repos/example-org/sample-repo/labels/enhancement-sample","name":"enhancement (Sample)","description":null,"color":"a2eeef","default":true}];
}
