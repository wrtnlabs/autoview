
import Component from "../components/799";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"node_id":"MDU6TGFiZWwx","url":"https://api.example.com/repos/example-org/sample-repo/labels/bug","name":"bug (Sample)","description":"A sample bug label for issues that indicate a problem in the sample application.","color":"d73a4a","default":false},{"id":102,"node_id":"MDU6TGFiZWwy","url":"https://api.example.com/repos/example-org/sample-repo/labels/enhancement","name":"enhancement (Test)","description":null,"color":"a2eeef","default":true},{"id":103,"node_id":"MDU6TGFiZWwz","url":"https://api.example.com/repos/example-org/sample-repo/labels/documentation","name":"documentation (Dummy)","description":"Label for tracking documentation-related improvements and updates (test label).","color":"0075ca","default":false}];
}
