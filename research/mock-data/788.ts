
import Component from "../components/788";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"node_id":"MDU6TGFiZWwxMDE=","url":"https://api.example.com/v1/labels/bug-test","name":"bug (Test)","description":"Something isn't working (Sample)","color":"d73a4a","default":true},{"id":102,"node_id":"MDU6TGFiZWwxMDI=","url":"https://api.example.com/v1/labels/enhancement-test","name":"enhancement","description":null,"color":"a2eeef","default":false},{"id":103,"node_id":"MDU6TGFiZWwxMDM=","url":"https://api.example.com/v1/labels/question-test","name":"question","description":"Further information is requested (Sample)","color":"d876e3","default":false}];
}
