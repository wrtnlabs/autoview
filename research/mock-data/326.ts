
import Component from "../components/326";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":101,"name":"Sample Classroom (Test)","archived":false,"organization":{"id":202,"login":"sample-org","node_id":"MDQ6VGVzdE9yZzIwMg==","html_url":"https://github.com/sample-org","name":"Sample Org (Test)","avatar_url":"https://avatars.githubusercontent.com/u/202?v=4"},"url":"https://classroom.github.com/classrooms/101-sample-classroom-test"};
}
