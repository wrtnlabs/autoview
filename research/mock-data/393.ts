
import Component from "../components/393";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":101,"name":"Sample Runner Group (Test)","visibility":"selected","default":false,"selected_repositories_url":"https://api.example.org/orgs/sample-org/runner-groups/101/selected_repositories","runners_url":"https://api.example.org/orgs/sample-org/runner-groups/101/runners","hosted_runners_url":"https://api.example.org/orgs/sample-org/runner-groups/101/hosted_runners","network_configuration_id":"net-config-sample-001","inherited":false,"inherited_allows_public_repositories":false,"allows_public_repositories":true,"workflow_restrictions_read_only":false,"restricted_to_workflows":true,"selected_workflows":["build_and_test.yaml (Sample)","deploy_release.yaml (Test)"]};
}
