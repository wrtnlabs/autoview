
import Component from "../components/336";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"default_for_new_repos":"private_and_internal","configuration":{"id":101,"name":"Default Sample Config v1","target_type":"organization","description":"A sample description for this test configuration item. It includes several options for demonstration purposes.","advanced_security":"enabled","dependency_graph":"enabled","dependency_graph_autosubmit_action":"not_set","dependency_graph_autosubmit_action_options":{"labeled_runners":false},"dependabot_alerts":"enabled","dependabot_security_updates":"not_set","code_scanning_default_setup":"enabled","code_scanning_default_setup_options":{"runner_type":"labeled","runner_label":"gpu-test-runner-sample"},"code_scanning_delegated_alert_dismissal":"not_set","secret_scanning":"enabled","secret_scanning_push_protection":"enabled","secret_scanning_delegated_bypass":"disabled","secret_scanning_delegated_bypass_options":{"reviewers":[{"reviewer_id":1001,"reviewer_type":"TEAM"},{"reviewer_id":90210,"reviewer_type":"ROLE"}]},"secret_scanning_validity_checks":"enabled","secret_scanning_non_provider_patterns":"disabled","secret_scanning_generic_secrets":"enabled","secret_scanning_delegated_alert_dismissal":"not_set","private_vulnerability_reporting":"disabled","enforcement":"enforced","url":"https://api.example.com/v1/security/configs/101","html_url":"https://www.example.com/configs/test-config-101","created_at":"2025-05-18T12:00:00Z","updated_at":"2025-05-19T08:30:00Z"}};
}
