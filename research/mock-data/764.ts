
import Component from "../components/764";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"vcs":"git","use_lfs":true,"vcs_url":"https://git.example.org/sample-repo.git","svc_root":"https://svc.example.org/root","status":"importing","status_text":"Import process at 45% (Test Only)","import_percent":45,"commit_count":128,"push_percent":null,"has_large_files":true,"large_files_size":4096,"large_files_count":2,"project_choices":[{"vcs":"git","human_name":"Sample Repo (Test)"},{"vcs":"tfvc","tfvc_project":"TestProjectAlpha","human_name":"Sample TFVC Project (Dummy)"}],"message":"Sample import started. Logs will be available here.","authors_count":5,"url":"https://api.example.org/v2/imports/123","html_url":"https://www.example.org/imports/123/status","authors_url":"https://api.example.org/v2/imports/123/authors","repository_url":"https://api.example.org/v2/repos/sample-repo","svn_root":"https://svn.example.org/root"};
}
