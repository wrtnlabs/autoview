
import Component from "../components/902";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"incomplete_results":false,"items":[{"id":101,"node_id":"NODEID_Label_001xyz=","url":"https://api.example.com/labels/bug","name":"bug (Test Label)","color":"f29513","default":false,"description":"This is a sample bug label for UI testing purposes.","score":42.7,"text_matches":[{"object_url":"https://api.example.com/repos/example-org/sample-repo/issues/123","object_type":"issue","property":"label.name","fragment":"bug","matches":[{"text":"bug","indices":[0,3]}]}]},{"id":102,"node_id":"NODEID_Label_002abc=","url":"https://api.example.com/labels/enhancement","name":"enhancement (Sample)","color":"a2eeef","default":true,"description":null,"score":37.2}]};
}
