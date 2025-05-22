
import Component from "../components/764";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"vcs":"git","use_lfs":true,"vcs_url":"https://git.example.com/sample-org/sample-repo.git","svc_root":"https://git.example.com","status":"complete","status_text":"Import operation completed successfully.","failed_step":null,"error_message":null,"import_percent":100,"commit_count":42,"push_percent":100,"has_large_files":false,"project_choices":[{"vcs":"git","human_name":"Sample Repo (Test Import)"},{"tfvc_project":"dummy_tfvc_project","human_name":"TFVC Dummy Project (Test)"}],"message":"Import completed with no issues.","authors_count":5,"url":"https://api.example.com/repos/example-org/sample-repo/imports/789","html_url":"https://www.example.com/repos/example-org/sample-repo/imports/789","authors_url":"https://api.example.com/repos/example-org/sample-repo/imports/789/authors","repository_url":"https://api.example.com/repos/example-org/sample-repo"};
}
