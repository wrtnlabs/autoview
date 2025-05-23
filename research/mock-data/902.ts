
import Component from "../components/902";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"incomplete_results":false,"items":[{"id":101,"node_id":"MDEwOlJlbGVhc2VMYWJlbDEwMQ==","url":"https://api.example.com/search/labels/101","name":"dummy-label","color":"f29513","default":false,"description":"A sample label for UI testing purposes.","score":0.85,"text_matches":[{"object_url":"https://api.example.com/repos/example-org/sample-repo/issues/1","object_type":"Issue","property":"title","fragment":"This is a sample fragment containing the dummy-label for testing.","matches":[{"text":"dummy-label","indices":[31,42]}]}]},{"id":102,"node_id":"MDEwOlJlbGVhc2VMYWJlbDEwMg==","url":"https://api.example.com/search/labels/102","name":"enhancement (Test)","color":"a2eeef","default":true,"description":null,"score":1}]};
}
