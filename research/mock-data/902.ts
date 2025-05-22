
import Component from "../components/902";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"incomplete_results":false,"items":[{"id":101,"node_id":"NODEID_label_101","url":"https://api.example.com/labels/101","name":"bug (Sample)","color":"f29513","default":false,"description":"A sample description for bug label. For testing UI rendering only.","score":0.98},{"id":202,"node_id":"NODEID_label_202","url":"https://api.example.com/labels/202","name":"enhancement (Test)","color":"a2eeef","default":true,"description":null,"score":0.85,"text_matches":[{"object_url":"https://api.example.com/labels/202","object_type":"Label","property":"name","fragment":"enhancement","matches":[{"text":"enhancement","indices":[0,11]}]}]}]};
}
