
import Component from "../components/789";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":1,"node_id":"NODEID_Label_001","url":"https://api.example.com/labels/1","name":"bug (Sample)","description":"Indicates an issue relating to a bug in the system (Sample).","color":"d73a4a","default":false},{"id":2,"node_id":"NODEID_Label_002","url":"https://api.example.com/labels/2","name":"enhancement (Test)","description":null,"color":"a2eeef","default":false},{"id":3,"node_id":"NODEID_Label_003","url":"https://api.example.com/labels/3","name":"question (Dummy)","description":"Denotes a question about usage or behavior (Dummy).","color":"d876e3","default":true}];
}
