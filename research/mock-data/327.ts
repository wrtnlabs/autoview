
import Component from "../components/327";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":2001,"public_repo":true,"title":"Sample Assignment Alpha","type":"individual","invite_link":"https://classroom.example.com/invite/alpha123","invitations_enabled":true,"slug":"sample-assignment-alpha","students_are_repo_admins":false,"feedback_pull_requests_enabled":true,"max_teams":null,"max_members":null,"editor":"VS Code","accepted":25,"submitted":18,"passing":15,"language":"JavaScript","deadline":"2025-06-01T23:59:00Z","classroom":{"id":101,"name":"Intro to Software Testing (Sample)","archived":false,"url":"https://classroom.example.com/classrooms/101"}},{"id":2002,"public_repo":false,"title":"Group Project Beta (Test)","type":"group","invite_link":"https://classroom.example.com/invite/beta456","invitations_enabled":false,"slug":"group-project-beta-test","students_are_repo_admins":true,"feedback_pull_requests_enabled":false,"max_teams":5,"max_members":3,"editor":"Sublime Text","accepted":8,"submitted":6,"passing":5,"language":"Python","deadline":null,"classroom":{"id":102,"name":"Advanced QA Group (Test)","archived":true,"url":"https://classroom.example.com/classrooms/102"}}];
}
