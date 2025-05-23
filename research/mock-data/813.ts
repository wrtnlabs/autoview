
import Component from "../components/813";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"url":"https://api.example.com/repos/sample-org/sample-repo/pages","status":"building","cname":"pages.example-project.test","protected_domain_state":"pending","pending_domain_unverified_at":"2025-06-15T12:00:00Z","custom_404":false,"html_url":"https://pages.example-project.test","build_type":"workflow","source":{"branch":"main","path":"docs"},"public":false,"https_certificate":{"state":"authorization_pending","description":"Sample HTTPS certificate provisioning for pages.example-project.test (Test Data)","domains":["pages.example-project.test","alt-pages.example-project.test"],"expires_at":"2026-01-15"},"https_enforced":true};
}
