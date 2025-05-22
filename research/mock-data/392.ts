
import Component from "../components/392";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"runner_groups":[{"id":1001,"name":"Default All Runners Group (Sample)","visibility":"all","default":true,"runners_url":"https://api.github.com/orgs/example-org/actions/runner-groups/1001/runners","inherited":false,"allows_public_repositories":true},{"id":1002,"name":"Selected Repos Group (Test)","visibility":"selected","default":false,"selected_repositories_url":"https://api.github.com/orgs/example-org/actions/runner-groups/1002/selected-repositories","runners_url":"https://api.github.com/orgs/example-org/actions/runner-groups/1002/runners","hosted_runners_url":"https://api.github.com/orgs/example-org/actions/runner-groups/1002/hosted-runners","network_configuration_id":"net-config-002","inherited":true,"inherited_allows_public_repositories":false,"allows_public_repositories":false,"workflow_restrictions_read_only":true,"restricted_to_workflows":true,"selected_workflows":["ci-build.yml","release-pipeline.yml"]}]};
}
