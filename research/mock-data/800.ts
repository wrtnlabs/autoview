
import Component from "../components/800";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":42,"node_id":"NODEID_Label_abc123XYZ=","url":"https://api.example.com/repos/sample-owner/sample-repo/labels/bug-sample","name":"bug (Sample)","description":"This is a sample label for testing UI components. All content is fictional and for demonstration only.","color":"a1b2c3","default":false};
}
