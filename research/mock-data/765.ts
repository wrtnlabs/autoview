
import Component from "../components/765";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"vcs":"git","use_lfs":true,"vcs_url":"https://github.com/example-org/sample-repo.git","status":"importing","status_text":"Import is 45% complete (sample)","import_percent":45,"commit_count":150,"push_percent":10,"has_large_files":true,"large_files_size":2048,"large_files_count":3,"project_choices":[{"vcs":"git","human_name":"Sample Repo (Test)"},{"vcs":"tfvc","tfvc_project":"SampleTFVCProject","human_name":"TFVC Project (Test)"}],"message":"Started import for sample-repo (Test)","authors_count":5,"url":"https://api.example.org/v1/imports/789","html_url":"https://www.example.org/imports/789","authors_url":"https://api.example.org/v1/imports/789/authors","repository_url":"https://api.example.org/v1/repos/example-org/sample-repo"};
}
