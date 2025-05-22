
import Component from "../components/813";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"url":"https://api.example.com/repos/sample-org/sample-repo/pages","status":"building","cname":"test-domain.example.net","protected_domain_state":"pending","pending_domain_unverified_at":"2025-06-01T12:00:00Z","custom_404":true,"html_url":"https://test-domain.example.net","build_type":"workflow","source":{"branch":"main","path":"/docs"},"public":true,"https_certificate":{"state":"issued","description":"Sample HTTPS certificate for test-domain.example.net. For UI testing only.","domains":["test-domain.example.net","www.test-domain.example.net"],"expires_at":"2026-01-01"},"https_enforced":true};
}
