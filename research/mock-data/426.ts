
import Component from "../components/426";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":101,"name":"Org-Wide Security Baseline (Test)","target_type":"organization","description":"This is a sample description for AutoViewInput code security configuration. It is purely fictional and for UI testing purposes.","advanced_security":"enabled","dependency_graph":"not_set","dependency_graph_autosubmit_action":"enabled","dependency_graph_autosubmit_action_options":{"labeled_runners":true},"dependabot_alerts":"enabled","dependabot_security_updates":"disabled","code_scanning_default_setup":"enabled","code_scanning_default_setup_options":{"runner_type":"labeled","runner_label":"gpu-test-runner-sample"},"code_scanning_delegated_alert_dismissal":"not_set","secret_scanning":"enabled","secret_scanning_push_protection":"disabled","secret_scanning_delegated_bypass":"enabled","secret_scanning_delegated_bypass_options":{"reviewers":[{"reviewer_id":1001,"reviewer_type":"TEAM"},{"reviewer_id":90210,"reviewer_type":"ROLE"}]},"secret_scanning_validity_checks":"not_set","secret_scanning_non_provider_patterns":"enabled","secret_scanning_generic_secrets":"disabled","secret_scanning_delegated_alert_dismissal":"enabled","private_vulnerability_reporting":"enabled","enforcement":"enforced","url":"https://api.example.com/v1/security/configurations/101","html_url":"https://www.example.com/configs/test-config-101/details","created_at":"2025-05-19T09:00:00Z","updated_at":"2025-05-19T12:30:45Z"};
}
