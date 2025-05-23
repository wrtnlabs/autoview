
import Component from "../components/769";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"vcs":"git","use_lfs":true,"vcs_url":"https://github.com/example-user/sample-repo.git","status":"importing","status_text":"Import in progress (sample)","failed_step":null,"error_message":null,"import_percent":45,"commit_count":10,"push_percent":20,"has_large_files":true,"large_files_size":2048,"large_files_count":3,"project_choices":[{"vcs":"git","human_name":"Sample Repo Clone Option (Test)"},{"vcs":"svn","tfvc_project":"TestProject","human_name":"SVN Project Test"}],"message":"Starting import process for UI testing (sample data).","authors_count":5,"url":"https://api.example.com/v1/imports/67890","html_url":"https://www.example.com/v1/imports/67890.html","authors_url":"https://api.example.com/v1/imports/67890/authors","repository_url":"https://api.example.com/v1/imports/67890/repository"};
}
