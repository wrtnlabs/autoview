
import Component from "../components/721";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"change_type":"added","manifest":"package.json","ecosystem":"npm","name":"@example-org/ui-components-sample","version":"1.2.0","package_url":"https://registry.example.com/@example-org/ui-components-sample/-/ui-components-sample-1.2.0.tgz","license":"MIT","source_repository_url":"https://github.com/example-org/ui-components-sample","vulnerabilities":[{"severity":"critical","advisory_ghsa_id":"GHSA-sample-0001","advisory_summary":"Test vulnerability description for mock data.","advisory_url":"https://github.com/advisories/GHSA-sample-0001"},{"severity":"medium","advisory_ghsa_id":"GHSA-sample-0002","advisory_summary":"Another sample advisory summary for testing.","advisory_url":"https://github.com/advisories/GHSA-sample-0002"}],"scope":"runtime"},{"change_type":"removed","manifest":"requirements.txt","ecosystem":"pip","name":"test-data-generator-cli","version":"0.3.5","package_url":null,"license":"Apache-2.0","source_repository_url":null,"vulnerabilities":[],"scope":"development"}];
}
