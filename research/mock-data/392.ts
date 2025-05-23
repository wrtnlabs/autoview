
import Component from "../components/392";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"runner_groups":[{"id":1001,"name":"Primary Runner Group (Sample)","visibility":"all","default":true,"runners_url":"https://api.example.com/orgs/sample-org/runner-groups/1001/runners","inherited":false,"allows_public_repositories":true},{"id":1002,"name":"QA Runner Group (Test)","visibility":"selected","default":false,"selected_repositories_url":"https://api.example.com/orgs/sample-org/runner-groups/1002/selected_repositories","runners_url":"https://api.example.com/orgs/sample-org/runner-groups/1002/runners","hosted_runners_url":"https://api.example.com/orgs/sample-org/runner-groups/1002/hosted-runners","network_configuration_id":"net-config-qa-001","inherited":true,"inherited_allows_public_repositories":false,"allows_public_repositories":false,"workflow_restrictions_read_only":false,"restricted_to_workflows":true,"selected_workflows":["deploy.yml","test_suite.yml"]}]};
}
