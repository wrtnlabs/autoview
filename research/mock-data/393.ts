
import Component from "../components/393";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":42,"name":"Sample Runner Group (Test)","visibility":"selected","default":false,"selected_repositories_url":"https://api.example.com/orgs/sample-org/runner-groups/42/selected_repositories","runners_url":"https://api.example.com/orgs/sample-org/runner-groups/42/runners","hosted_runners_url":"https://api.example.com/orgs/sample-org/runner-groups/42/hosted-runners","network_configuration_id":"net-config-sample-001","inherited":false,"allows_public_repositories":false,"workflow_restrictions_read_only":true,"restricted_to_workflows":true,"selected_workflows":["ci-test-workflow.yml","deploy-sample.yaml"]};
}
