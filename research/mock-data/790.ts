
import Component from "../components/790";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":1,"node_id":"NODEID_Label_1a2B3C","url":"https://api.example.com/labels/1","name":"Priority: High (Test)","description":"Indicates high priority items for demonstration purposes.","color":"ff0000","default":false},{"id":2,"node_id":"NODEID_Label_4D5E6F","url":"https://api.example.com/labels/2","name":"bug (Sample)","description":null,"color":"d73a4a","default":false},{"id":3,"node_id":"NODEID_Label_XYZ789","url":"https://api.example.com/labels/3","name":"enhancement (Sample)","description":"Feature requests and sample enhancements for UI testing.","color":"a2eeef","default":true}];
}
