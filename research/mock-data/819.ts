
import Component from "../components/819";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":12345678,"status_url":"https://api.github.com/repos/example-org/sample-repo/pages/deployment/12345678/status","page_url":"https://example-org.github.io/sample-repo-sample/","preview_url":"https://preview-example-org.github.io/sample-repo-pr-42"};
}
