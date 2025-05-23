
import Component from "../components/788";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"node_id":"MDU6TGFiZWwxMDE=","url":"https://api.example.com/repos/example-org/sample-repo/labels/bug","name":"bug (Sample)","description":"Sample label for bug issues. This is a fictional label for UI testing.","color":"f29513","default":false},{"id":102,"node_id":"MDU6TGFiZWwxMDI=","url":"https://api.example.com/repos/example-org/sample-repo/labels/enhancement","name":"enhancement (Sample)","description":null,"color":"a2eeef","default":false},{"id":103,"node_id":"MDU6TGFiZWwxMDM=","url":"https://api.example.com/repos/example-org/sample-repo/labels/documentation","name":"documentation (Sample)","description":"Fictional documentation label for UI layout tests.","color":"0075ca","default":true}];
}
