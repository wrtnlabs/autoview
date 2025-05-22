
import Component from "../components/765";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"vcs":"git","use_lfs":true,"vcs_url":"https://github.com/example-user/sample-repo.git","status":"importing","status_text":"Import in progress (test)","failed_step":null,"import_percent":45,"commit_count":120,"push_percent":null,"has_large_files":true,"large_files_size":2048000,"large_files_count":3,"project_choices":[{"vcs":"git","human_name":"Sample Repo Mirror 1"},{"vcs":"tfvc","tfvc_project":"TestProject","human_name":"Sample TFVC Project"}],"message":"Scheduled import for UI testing.","authors_count":5,"url":"https://api.example.org/v1/imports/12345","html_url":"https://www.example.org/imports/12345","authors_url":"https://api.example.org/v1/imports/12345/authors","repository_url":"https://api.example.org/v1/repos/example-user/sample-repo","svn_root":"https://svn.example.org/repos/sample-svn"};
}
