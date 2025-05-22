
import Component from "../components/721";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"change_type":"added","manifest":"package.json","ecosystem":"npm","name":"@example-org/ui-components-sample","version":"1.2.3","package_url":"https://registry.example.org/npm/@example-org/ui-components-sample","license":"MIT","source_repository_url":"https://github.com/example-org/ui-components-sample","vulnerabilities":[{"severity":"low","advisory_ghsa_id":"GHSA-abcdef12-34gh-56ij","advisory_summary":"Sample vulnerability summary for testing UI.","advisory_url":"https://github.com/advisories/GHSA-abcdef12-34gh-56ij"},{"severity":"high","advisory_ghsa_id":"GHSA-1234abcd-56ef-78gh","advisory_summary":"Another fictional vulnerability example (Test).","advisory_url":"https://github.com/advisories/GHSA-1234abcd-56ef-78gh"}],"scope":"runtime"},{"change_type":"removed","manifest":"requirements.txt","ecosystem":"pip","name":"sample-data-generator-cli","version":"0.9.0","package_url":null,"license":null,"source_repository_url":null,"vulnerabilities":[],"scope":"development"}];
}
