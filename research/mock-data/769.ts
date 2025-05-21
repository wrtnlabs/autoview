
import Component from "../components/769";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"vcs":"git","use_lfs":true,"vcs_url":"https://github.com/example-org/sample-repo.git","status":"complete","status_text":"Import completed successfully.","import_percent":100,"commit_count":42,"push_percent":100,"has_large_files":true,"large_files_size":1536,"large_files_count":3,"project_choices":[{"vcs":"git","human_name":"Sample Repo Mirror"}],"message":"Import operation completed. 42 commits imported.","authors_count":5,"url":"https://api.github.com/repos/example-org/sample-repo/import","html_url":"https://github.com/example-org/sample-repo/import-results","authors_url":"https://api.github.com/repos/example-org/sample-repo/import/authors","repository_url":"https://api.github.com/repos/example-org/sample-repo"};
}
