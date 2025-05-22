
import Component from "../components/429";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":1001,"name":"Org-Wide Security Baseline (Test)","target_type":"organization","description":"A sample description for this test configuration item. It includes several options for demonstration.","advanced_security":"enabled","dependency_graph":"enabled","dependency_graph_autosubmit_action":"disabled","dependency_graph_autosubmit_action_options":{"labeled_runners":true},"dependabot_alerts":"enabled","dependabot_security_updates":"not_set","code_scanning_default_setup":"enabled","code_scanning_default_setup_options":{"runner_type":"labeled","runner_label":"security-scan-runner-sample"},"code_scanning_delegated_alert_dismissal":"disabled","secret_scanning":"enabled","secret_scanning_push_protection":"not_set","secret_scanning_delegated_bypass":"enabled","secret_scanning_delegated_bypass_options":{"reviewers":[{"reviewer_id":2001,"reviewer_type":"TEAM"},{"reviewer_id":305,"reviewer_type":"ROLE"}]},"secret_scanning_validity_checks":"enabled","secret_scanning_non_provider_patterns":"disabled","secret_scanning_generic_secrets":"not_set","secret_scanning_delegated_alert_dismissal":"disabled","private_vulnerability_reporting":"not_set","enforcement":"enforced","url":"https://api.example.com/v1/security/configurations/1001","html_url":"https://www.example.com/configs/security/1001/details","created_at":"2025-05-19T14:30:00Z","updated_at":"2025-05-19T15:45:00Z"};
}
