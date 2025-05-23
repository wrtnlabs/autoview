
import Component from "../components/324";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"assignment_name":"Sample Assignment 1 (Test)","assignment_url":"https://classroom.example.com/assignments/sample-assignment-1","starter_code_url":"https://classroom.example.com/assignments/sample-assignment-1/starter-code","github_username":"teststudent1","roster_identifier":"RS10001","student_repository_name":"teststudent1-sample-assignment-1","student_repository_url":"https://github.com/example-org/teststudent1-sample-assignment-1.git","submission_timestamp":"2025-05-18T16:45:00Z","points_awarded":85,"points_available":100},{"assignment_name":"Group Project Sample (Team)","assignment_url":"https://classroom.example.com/assignments/group-project-sample","starter_code_url":"https://classroom.example.com/assignments/group-project-sample/starter-code","github_username":"groupmemberA","roster_identifier":"RS20002","student_repository_name":"team-sample-group-project","student_repository_url":"https://github.com/example-org/team-sample-group-project.git","submission_timestamp":"2025-05-19T09:30:00Z","points_awarded":92,"points_available":100,"group_name":"Team Sample (Test Group)"}];
}
