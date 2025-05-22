
import Component from "../components/334";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":101,"name":"Default Sample Config v1","target_type":"organization","description":"A sample description for this test configuration item. It includes several options for demonstration.","advanced_security":"enabled","dependency_graph":"enabled","dependency_graph_autosubmit_action":"disabled","dependency_graph_autosubmit_action_options":{"labeled_runners":false},"dependabot_alerts":"not_set","dependabot_security_updates":"enabled","code_scanning_default_setup":"enabled","code_scanning_default_setup_options":{"runner_type":"labeled","runner_label":"gpu-test-runner-sample"},"code_scanning_delegated_alert_dismissal":"disabled","secret_scanning":"enabled","secret_scanning_push_protection":"enabled","secret_scanning_delegated_bypass":"not_set","secret_scanning_delegated_bypass_options":{"reviewers":[{"reviewer_id":1001,"reviewer_type":"TEAM"},{"reviewer_id":90210,"reviewer_type":"ROLE"}]},"secret_scanning_validity_checks":"disabled","secret_scanning_non_provider_patterns":"enabled","secret_scanning_generic_secrets":"not_set","secret_scanning_delegated_alert_dismissal":"enabled","private_vulnerability_reporting":"disabled","enforcement":"enforced","url":"https://api.example.com/v1/code_security_configurations/101","html_url":"https://www.example.com/configs/default-sample-config-v1/details","created_at":"2025-05-19T14:30:00Z","updated_at":"2025-05-20T09:15:00Z"};
}
