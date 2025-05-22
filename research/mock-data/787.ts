
import Component from "../components/787";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"node_id":"MDU6TGFiZWwxMDE=","url":"https://api.example.com/repos/example-org/sample-repo/labels/bug","name":"bug (Test)","description":"An issue with the system that needs investigation. (Sample Label)","color":"f29513","default":true},{"id":102,"node_id":"MDU6TGFiZWwxMDI=","url":"https://api.example.com/repos/example-org/sample-repo/labels/enhancement","name":"enhancement (Sample)","description":null,"color":"a2eeef","default":false},{"id":103,"node_id":"MDU6TGFiZWwxMDM=","url":"https://api.example.com/repos/example-org/sample-repo/labels/question","name":"question (Dummy)","description":"Further information is requested on this topic. (Dummy Label)","color":"d4c5f9","default":false}];
}
