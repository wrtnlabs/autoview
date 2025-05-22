
import Component from "../components/799";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"node_id":"MDU6TGFiZWwxMDE=","url":"https://api.example.com/repos/example-org/sample-repo/labels/bug","name":"bug","description":"Something isn't working (Test Label)","color":"d73a4a","default":true},{"id":102,"node_id":"MDU6TGFiZWwxMDI=","url":"https://api.example.com/repos/example-org/sample-repo/labels/feature","name":"feature","description":"New feature request (Sample Label)","color":"a2eeef","default":false},{"id":103,"node_id":"MDU6TGFiZWwxMDM=","url":"https://api.example.com/repos/example-org/sample-repo/labels/documentation","name":"documentation","description":null,"color":"cfd3d7","default":false}];
}
