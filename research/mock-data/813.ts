
import Component from "../components/813";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"url":"https://api.github.com/repos/example-org/sample-repo/pages","status":"building","cname":"test-project-docs.example.com","protected_domain_state":"pending","pending_domain_unverified_at":"2025-06-01T00:00:00Z","custom_404":true,"html_url":"https://test-project-docs.example.com/docs","build_type":"workflow","source":{"branch":"docs","path":"/"},"public":true,"https_certificate":{"state":"authorized","description":"Test HTTPS certificate for sample domain (Test Data).","domains":["test-project-docs.example.com","www.test-project-docs.example.com"],"expires_at":"2026-01-01"},"https_enforced":true};
}
