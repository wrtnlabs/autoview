
import Component from "../components/801";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":123,"node_id":"MDU6TGFiZWwxMjM4NzY=","url":"https://api.example.com/repos/example-org/sample-repo/labels/bug-sample","name":"bug (Test)","description":"A sample label for UI testing purposes. This description is fictional.","color":"ff5733","default":false};
}
