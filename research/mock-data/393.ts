
import Component from "../components/393";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":42,"name":"Sample Runner Group (Test)","visibility":"selected","default":false,"selected_repositories_url":"https://api.github.com/orgs/sample-org/actions/runner-groups/42/selected_repositories","runners_url":"https://api.github.com/orgs/sample-org/actions/runner-groups/42/runners","hosted_runners_url":"https://api.github.com/orgs/sample-org/actions/runner-groups/42/hosted-runners","network_configuration_id":"net-config-sample-01","inherited":false,"allows_public_repositories":false,"workflow_restrictions_read_only":false,"restricted_to_workflows":true,"selected_workflows":["build-and-test.yml","deploy-staging.yml"]};
}
