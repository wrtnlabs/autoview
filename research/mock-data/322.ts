
import Component from "../components/322";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":101,"public_repo":true,"title":"Sample Classroom Assignment (Test)","type":"individual","invite_link":"https://classroom.github.com/a/SAMPLE1234","invitations_enabled":true,"slug":"sample-classroom-assignment","students_are_repo_admins":false,"feedback_pull_requests_enabled":true,"max_teams":null,"max_members":null,"editor":"Visual Studio Code","accepted":42,"submitted":37,"passing":30,"language":"TypeScript","deadline":"2025-10-01T23:59:00Z","starter_code_repository":{"id":201,"full_name":"example-org/sample-classroom-starter","html_url":"https://github.com/example-org/sample-classroom-starter","node_id":"MDEwOlJlcG9zaXRvcnkyMDE=","private":false,"default_branch":"main"},"classroom":{"id":10,"name":"Sample Classroom (Test)","archived":false,"organization":{"id":500,"login":"example-org","node_id":"MDEyOk9yZ2FuaXphdGlvbjUwMA==","html_url":"https://github.com/example-org","name":"Example Organization (Test)","avatar_url":"https://example.com/avatar-example.png"},"url":"https://classroom.github.com/classrooms/sample-classroom"}};
}
