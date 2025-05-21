
import Component from "../components/814";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"url":"https://api.github.com/repos/example-org/sample-repo/pages","status":"building","cname":"docs.sample-project-test.example.com","protected_domain_state":"pending","pending_domain_unverified_at":"2025-06-10T09:30:00Z","custom_404":true,"html_url":"https://example-org.github.io/sample-repo-test","build_type":"workflow","source":{"branch":"main","path":"/docs"},"public":true,"https_enforced":true,"https_certificate":{"state":"issued","description":"Auto-generated sample certificate for GitHub Pages (Test)","domains":["example-org.github.io","docs.sample-project-test.example.com"],"expires_at":"2025-12-31"}};
}
