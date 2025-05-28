
import Component from "../components/801";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":123,"node_id":"MDU6TGFiZWwxMjM0NTY3ODk=","url":"https://api.example.com/repos/example-org/sample-repo/labels/sample-label","name":"sample-label","description":"This is a sample label used for UI testing purposes. (Sample Data)","color":"ff5733","default":false};
}
