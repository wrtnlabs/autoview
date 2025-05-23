
import Component from "../components/721";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"change_type":"added","manifest":"package.json","ecosystem":"npm","name":"@example-org/ui-components-sample","version":"1.2.3","package_url":"https://registry.npmjs.org/@example-org/ui-components-sample/-/ui-components-sample-1.2.3.tgz","license":"MIT","source_repository_url":"https://github.com/example-org/ui-components-sample","vulnerabilities":[{"severity":"high","advisory_ghsa_id":"GHSA-ab12-cd34-ef56","advisory_summary":"Sample vulnerability summary for UI components. This is a test advisory for demonstration purposes.","advisory_url":"https://github.com/advisories/GHSA-ab12-cd34-ef56"},{"severity":"moderate","advisory_ghsa_id":"GHSA-xy12-zt34-uv56","advisory_summary":"Another test advisory with moderate impact severity for UI component library.","advisory_url":"https://github.com/advisories/GHSA-xy12-zt34-uv56"}],"scope":"runtime"},{"change_type":"removed","manifest":"requirements.txt","ecosystem":"pip","name":"example-lib","version":"0.9.1","package_url":null,"license":null,"source_repository_url":null,"vulnerabilities":[],"scope":"development"}];
}
