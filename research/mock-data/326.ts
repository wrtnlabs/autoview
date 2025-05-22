
import Component from "../components/326";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":101,"name":"Sample Classroom (Test)","archived":false,"organization":{"id":1001,"login":"sample-org-test","node_id":"MDEyOk9yZ2FuaXphdGlvbjEwMDE=","html_url":"https://github.com/sample-org-test","name":"Sample Organization (Test)","avatar_url":"https://avatars.githubusercontent.com/u/1001?v=4"},"url":"https://classroom.github.com/classrooms/101-sample-classroom"};
}
