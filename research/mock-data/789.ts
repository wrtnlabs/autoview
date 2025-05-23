
import Component from "../components/789";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":1,"node_id":"MDU6TGFiZWwx","url":"https://api.example.com/repos/sample-org/test-repo/labels/bug","name":"bug","description":"Something isn't working (sample label)","color":"d73a4a","default":true},{"id":2,"node_id":"MDU6TGFiZWwy","url":"https://api.example.com/repos/sample-org/test-repo/labels/enhancement","name":"enhancement","description":"New feature or request (test)","color":"a2eeef","default":true},{"id":3,"node_id":"MDU6TGFiZWwz","url":"https://api.example.com/repos/sample-org/test-repo/labels/question","name":"question","description":null,"color":"d876e3","default":false}];
}
