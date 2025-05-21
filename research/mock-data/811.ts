
import Component from "../components/811";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"node_id":"MDU6TGFiZWwxMDE=","url":"https://api.example.com/labels/101","name":"bug (Test Label)","description":"Tracks sample bug issues for UI testing purposes.","color":"d73a4a","default":false},{"id":102,"node_id":"MDU6TGFiZWwxMDI=","url":"https://api.example.com/labels/102","name":"enhancement (Sample)","description":null,"color":"a2eeef","default":true}];
}
