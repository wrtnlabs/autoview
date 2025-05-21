
import Component from "../components/802";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":101,"node_id":"MDU6TGFiZWwxMDE=","url":"https://api.example.com/v1/labels/101","name":"bug (Sample)","description":"Indicates a sample issue for UI testing purposes. All content is fictional and for demonstration only.","color":"d73a4a","default":false};
}
