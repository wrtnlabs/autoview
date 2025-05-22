
import Component from "../components/392";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"runner_groups":[{"id":101,"name":"Sample Runner Group (Test)","visibility":"selected","default":false,"selected_repositories_url":"https://api.example.org/orgs/sample-org/actions/runner-groups/101/selected-repositories","runners_url":"https://api.example.org/orgs/sample-org/actions/runner-groups/101/runners","hosted_runners_url":"https://api.example.org/orgs/sample-org/actions/runner-groups/101/hosted-runners","network_configuration_id":"net-config-sample-001","inherited":false,"inherited_allows_public_repositories":false,"allows_public_repositories":false,"workflow_restrictions_read_only":true,"restricted_to_workflows":true,"selected_workflows":["build.yml","test-suite.yml"]},{"id":102,"name":"Default Runner Group (Test)","visibility":"all","default":true,"runners_url":"https://api.example.org/orgs/sample-org/actions/runner-groups/102/runners","inherited":true,"allows_public_repositories":true}]};
}
