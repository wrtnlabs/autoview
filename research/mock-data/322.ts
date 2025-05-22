
import Component from "../components/322";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":42,"public_repo":true,"title":"Sample Assignment 1 (Test)","type":"individual","invite_link":"https://classroom.github.com/a/sample-invite-link","invitations_enabled":true,"slug":"sample-assignment-1-test","students_are_repo_admins":false,"feedback_pull_requests_enabled":true,"max_teams":null,"max_members":null,"editor":"Visual Studio Code (Test)","accepted":15,"submitted":12,"passing":10,"language":"JavaScript","deadline":"2025-06-01T23:59:59Z","starter_code_repository":{"id":5001,"full_name":"example-org/sample-starter-repo","html_url":"https://github.com/example-org/sample-starter-repo","node_id":"MDEwOlJlcG9zaXRvcnk1MDAx","private":false,"default_branch":"main"},"classroom":{"id":1001,"name":"Intro to Testing (Sample Classroom)","archived":false,"organization":{"id":9001,"login":"example-org","node_id":"MDEyOk9yZ2FuaXphdGlvbjk","html_url":"https://github.com/example-org","name":"Example Org (Test)","avatar_url":"https://avatars.githubusercontent.com/u/9001?v=4"},"url":"https://classroom.github.com/classrooms/1001-sample-classroom"}};
}
