
import Component from "../components/769";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"vcs":"git","use_lfs":true,"vcs_url":"https://github.com/example-org/sample-repo.git","svc_root":"svc-test-root","status":"importing","status_text":"Import in progress (Sample)","failed_step":null,"error_message":null,"import_percent":57,"commit_count":128,"push_percent":null,"has_large_files":true,"large_files_size":20480,"large_files_count":3,"project_choices":[{"vcs":"git","human_name":"Sample Repo (Test)"},{"vcs":"tfvc","tfvc_project":"SampleTFVCProj","human_name":"Sample TFVC Project (Test)"}],"message":"Initial import mapping phases underway. (Test)","authors_count":5,"url":"https://api.example.com/v1/imports/0001","html_url":"https://www.example.com/imports/0001/status","authors_url":"https://api.example.com/v1/imports/0001/authors","repository_url":"https://api.example.com/v1/repos/sample-repo","svn_root":"https://svn.example.com/repos/sample-svn-repo"};
}
