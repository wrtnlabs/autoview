
import Component from "../components/790";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"node_id":"MDU6TGFiZWwxMDE=","url":"https://api.example.com/repos/sample-org/sample-repo/labels/bug","name":"bug (Test)","description":"Indicates a bug-related issue for UI testing purposes. This is sample data.","color":"d73a4a","default":false},{"id":102,"node_id":"MDU6TGFiZWwxMDI=","url":"https://api.example.com/repos/sample-org/sample-repo/labels/feature","name":"feature (Sample)","description":null,"color":"0e8a16","default":true}];
}
