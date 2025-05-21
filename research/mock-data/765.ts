
import Component from "../components/765";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"vcs":"git","use_lfs":true,"vcs_url":"https://bitbucket.example.com/test-user/sample-repo.git","svc_root":"bitbucket.example.com","status":"complete","status_text":"Import completed successfully. (Sample)","failed_step":null,"error_message":null,"import_percent":100,"commit_count":128,"push_percent":100,"has_large_files":true,"large_files_size":2048576,"large_files_count":3,"project_choices":[{"vcs":"git","human_name":"Primary Project (Test)"},{"vcs":"tfvc","tfvc_project":"TFVC_Project_Sample","human_name":"Secondary TFVC Project (Test)"}],"message":"Sample import operation for UI testing (dummy data).","authors_count":5,"url":"https://api.example.com/v1/imports/123456","html_url":"https://www.example.com/repos/sample-org/sample-repo/imports/123456","authors_url":"https://api.example.com/v1/imports/123456/authors","repository_url":"https://api.example.com/v1/repos/sample-org/sample-repo"};
}
