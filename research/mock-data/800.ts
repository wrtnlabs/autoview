
import Component from "../components/800";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":101,"node_id":"MDU6TGFiZWwxMDE=","url":"https://api.github.com/repos/example-org/sample-repo/labels/sample-label-test","name":"bug (Sample)","description":"A sample label for testing UI rendering (dummy data).","color":"abcdef","default":false};
}
