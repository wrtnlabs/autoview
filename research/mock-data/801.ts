
import Component from "../components/801";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":101,"node_id":"MDU6TGFiZWwxMDE=","url":"https://api.example.com/repos/example-org/sample-repo/labels/test-label-sample","name":"test-label-sample","description":"Sample label for testing UI rendering. This is a dummy label.","color":"a1b2c3","default":false};
}
