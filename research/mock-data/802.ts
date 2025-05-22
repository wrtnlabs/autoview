
import Component from "../components/802";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":101,"node_id":"MDU6TGFiZWwxMDE=","url":"https://api.example.com/repos/example-org/sample-repo/labels/bug-sample","name":"bug-sample","description":"Sample bug label for UI testing purposes. All content is fictional and for demonstration only.","color":"a1b2c3","default":false};
}
