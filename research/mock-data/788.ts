
import Component from "../components/788";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"node_id":"MDU6TGFiZWwxMDE=","url":"https://api.example.com/repos/example-org/sample-repo/labels/bug","name":"bug (Sample)","description":"A sample label for bug tracking UI testing. All data is fictional.","color":"d73a4a","default":true},{"id":102,"node_id":"MDU6TGFiZWwxMDI=","url":"https://api.example.com/repos/example-org/sample-repo/labels/enhancement","name":"enhancement (Test)","description":null,"color":"a2eeef","default":true},{"id":103,"node_id":"MDU6TGFiZWwxMDM=","url":"https://api.example.com/repos/example-org/sample-repo/labels/question","name":"question (Dummy)","description":"Generic question label used for demonstration purposes. This is sample data.","color":"d876e3","default":false}];
}
