
import Component from "../components/787";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"node_id":"MDU6TGFiZWwxMDE=","url":"https://api.example.com/repos/example-org/sample-repo/labels/bug","name":"bug (Sample)","description":"Indicates an unexpected problem or unintended behavior (sample).","color":"d73a4a","default":true},{"id":102,"node_id":"MDU6TGFiZWwxMDI=","url":"https://api.example.com/repos/example-org/sample-repo/labels/enhancement","name":"enhancement (Test)","description":"New feature or request for improvements (test label).","color":"a2eeef","default":false},{"id":103,"node_id":"MDU6TGFiZWwxMDM=","url":"https://api.example.com/repos/example-org/sample-repo/labels/documentation","name":"documentation","description":null,"color":"0075ca","default":false}];
}
