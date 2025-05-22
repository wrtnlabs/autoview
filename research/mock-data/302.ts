
import Component from "../components/302";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":101,"node_id":"NODEID_SampleConfig_abc123XYZ=","name":"Sample Configuration Item (Test)","description":"This is a sample configuration object used for UI testing. Lorem ipsum dolor sit amet, consectetur adipiscing elit.","owner":{"login":"test-owner-sample-org","type":"Organization","id":99001},"created_at":"2025-05-19T14:30:00Z","updated_at":"2025-05-19T15:45:30Z","settings":{"enabled":true,"threshold":5,"modes":["auto","manual","test"],"options":null},"items":[{"uid":1687184729,"label":"Sample Item A","metadata":{"tags":["alpha","beta","gamma"],"rating":4.5}}],"url":"https://api.example.com/v1/configurations/sample-101","notes":["Note 1: sample entry for UI testing.","Note 2: verify layout and truncation handling."],"external_reference":null};
}
