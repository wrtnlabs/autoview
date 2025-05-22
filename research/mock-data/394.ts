
import Component from "../components/394";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":98765,"name":"Test Runner Group Alpha (Sample)","visibility":"selected","default":false,"selected_repositories_url":"https://api.github.com/orgs/sample-org/runner-groups/98765/selected_repositories","runners_url":"https://api.github.com/orgs/sample-org/runner-groups/98765/runners","hosted_runners_url":"https://api.github.com/orgs/sample-org/runner-groups/98765/hosted_runners","network_configuration_id":"netcfg-xyz124","inherited":true,"inherited_allows_public_repositories":true,"allows_public_repositories":false,"workflow_restrictions_read_only":true,"restricted_to_workflows":true,"selected_workflows":["ci-build.yml","deploy-prod.yml"]};
}
