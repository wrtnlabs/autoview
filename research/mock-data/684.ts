
import Component from "../components/684";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"status":"attached","configuration":{"id":101,"name":"Default Sample Config v1 (Test)","target_type":"organization","description":"A sample description for this test configuration item. It includes several options for demonstration.","advanced_security":"enabled","dependency_graph":"not_set","dependency_graph_autosubmit_action":"enabled","dependency_graph_autosubmit_action_options":{"labeled_runners":true},"dependabot_alerts":"enabled","dependabot_security_updates":"disabled","code_scanning_default_setup":"enabled","code_scanning_default_setup_options":{"runner_type":"labeled","runner_label":"gpu-test-runner-sample"},"code_scanning_delegated_alert_dismissal":"not_set","secret_scanning":"disabled","secret_scanning_push_protection":"enabled","secret_scanning_delegated_bypass":"enabled","secret_scanning_delegated_bypass_options":{"reviewers":[{"reviewer_id":1001,"reviewer_type":"TEAM"},{"reviewer_id":90210,"reviewer_type":"ROLE"}]},"secret_scanning_validity_checks":"enabled","secret_scanning_non_provider_patterns":"disabled","secret_scanning_generic_secrets":"not_set","secret_scanning_delegated_alert_dismissal":"disabled","private_vulnerability_reporting":"enabled","enforcement":"enforced","url":"https://api.example.com/v1/code-security-configs/101","html_url":"https://www.example.com/configs/default-sample-config-v1-details","created_at":"2025-05-19T14:30:00Z","updated_at":"2025-06-01T09:15:00Z"}};
}
