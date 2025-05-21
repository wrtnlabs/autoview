
import Component from "../components/394";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":42,"name":"Sample Runner Group (Test)","visibility":"selected","default":false,"selected_repositories_url":"https://api.example.com/orgs/sample-org/runner-groups/42/selected_repositories","runners_url":"https://api.example.com/orgs/sample-org/runner-groups/42/runners","hosted_runners_url":"https://api.example.com/orgs/sample-org/runner-groups/42/hosted-runners","network_configuration_id":"net_conf_test_001","inherited":false,"allows_public_repositories":true,"workflow_restrictions_read_only":false,"restricted_to_workflows":true,"selected_workflows":["build_and_test.yml","deploy_prod.yml"]};
}
