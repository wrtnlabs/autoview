
import Component from "../components/764";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"vcs":"git","use_lfs":true,"vcs_url":"https://github.com/example-user/sample-repo.git","status":"importing","status_text":"Importing repository objects (Test)","import_percent":42,"commit_count":1200,"has_large_files":true,"large_files_size":2048,"large_files_count":3,"message":"Repository import initiated (Test)","authors_count":8,"url":"https://api.github.com/repos/example-user/sample-repo/imports/123456","html_url":"https://github.com/example-user/sample-repo/import","authors_url":"https://api.github.com/repos/example-user/sample-repo/imports/123456/authors","repository_url":"https://api.github.com/repos/example-user/sample-repo"};
}
