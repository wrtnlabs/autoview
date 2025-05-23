
import Component from "../components/327";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"public_repo":true,"title":"Introduction to TypeScript (Sample)","type":"individual","invite_link":"https://classroom.github.com/a/ts-intro-sample","invitations_enabled":true,"slug":"introduction-to-typescript-sample","students_are_repo_admins":false,"feedback_pull_requests_enabled":true,"max_teams":null,"max_members":null,"editor":"Visual Studio Code","accepted":25,"submitted":20,"passing":18,"language":"TypeScript","deadline":"2025-06-01T23:59:00Z","classroom":{"id":501,"name":"TS 101 Classroom (Test)","archived":false,"url":"https://classroom.github.com/classrooms/501-ts-101-sample"}},{"id":102,"public_repo":false,"title":"Group Project: API Development (Sample)","type":"group","invite_link":"https://classroom.github.com/a/api-dev-group-sample","invitations_enabled":true,"slug":"group-project-api-development-sample","students_are_repo_admins":true,"feedback_pull_requests_enabled":false,"max_teams":5,"max_members":4,"editor":"Atom","accepted":12,"submitted":10,"passing":9,"language":"JavaScript","deadline":null,"classroom":{"id":502,"name":"Backend Development Lab (Test)","archived":true,"url":"https://classroom.github.com/classrooms/502-backend-lab-sample"}}];
}
