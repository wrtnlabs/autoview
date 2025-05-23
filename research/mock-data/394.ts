
import Component from "../components/394";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":101,"name":"Sample Runner Group (Test)","visibility":"selected","default":false,"selected_repositories_url":"https://api.example.com/orgs/sample-org/runner-groups/101/selected-repositories","runners_url":"https://api.example.com/orgs/sample-org/runner-groups/101/runners","hosted_runners_url":"https://api.example.com/orgs/sample-org/runner-groups/101/hosted-runners","network_configuration_id":"net-config-sample-001","inherited":true,"inherited_allows_public_repositories":false,"allows_public_repositories":true,"workflow_restrictions_read_only":true,"restricted_to_workflows":true,"selected_workflows":["ci.yml","deploy.yml"]};
}
