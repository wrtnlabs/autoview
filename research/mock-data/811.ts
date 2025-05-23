
import Component from "../components/811";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"node_id":"MDU6TGFiZWwxMDE=","url":"https://api.example.com/v1/labels/bug","name":"bug","description":"Denotes an unexpected problem or unintended behavior. (Sample)","color":"d73a4a","default":true},{"id":102,"node_id":"MDU6TGFiZWwxMDI=","url":"https://api.example.com/v1/labels/enhancement","name":"enhancement","description":"New feature or request. (Sample)","color":"a2eeef","default":true},{"id":301,"node_id":"MDU6TGFiZWwzMDE=","url":"https://api.example.com/v1/labels/frontend-ui","name":"frontend-ui","description":null,"color":"c5def5","default":false},{"id":302,"node_id":"MDU6TGFiZWwzMDI=","url":"https://api.example.com/v1/labels/documentation","name":"documentation","description":"Improvements or additions to documentation. (Sample)","color":"0075ca","default":false}];
}
