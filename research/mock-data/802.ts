
import Component from "../components/802";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":101,"node_id":"NODEID_Label_101_xyzABC123=","url":"https://api.example.com/v1/labels/101","name":"bug (Sample Label)","description":"A sample description for the 'bug' label to categorize test issues in the UI component (Demo Data).","color":"ff5733","default":false};
}
