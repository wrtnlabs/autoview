
import Component from "../components/800";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":101,"node_id":"MDU6TGFiZWwxMDE=","url":"https://api.example.com/repos/example-org/sample-repo/labels/test-label","name":"test-label","description":"A sample description for this test label. This data is fictional and for UI testing only.","color":"ff5733","default":false};
}
