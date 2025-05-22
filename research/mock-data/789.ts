
import Component from "../components/789";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"node_id":"MDU6TGFiZWwxMDE=","url":"https://api.example.com/repos/example-org/sample-repo/labels/bug","name":"bug","description":"An issue indicating a bug in the system. (Sample)","color":"d73a4a","default":false},{"id":102,"node_id":"MDU6TGFiZWwxMDI=","url":"https://api.example.com/repos/example-org/sample-repo/labels/documentation","name":"documentation","description":"Improvements or additions to documentation. (Test)","color":"0075ca","default":false},{"id":103,"node_id":"MDU6TGFiZWwxMDM=","url":"https://api.example.com/repos/example-org/sample-repo/labels/enhancement","name":"enhancement (Test)","description":null,"color":"a2eeef","default":true}];
}
