
import Component from "../components/814";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"url":"https://api.example.org/repos/sample-org/sample-repo/pages","status":"building","cname":"www.sample-site-test.com","protected_domain_state":"pending","pending_domain_unverified_at":"2025-05-25T12:00:00Z","custom_404":true,"html_url":"https://www.sample-site-test.com","build_type":"workflow","source":{"branch":"main-test","path":"/docs"},"public":false,"https_certificate":{"state":"authorization_pending","description":"Sample HTTPS certificate pending authorization. This is a test entry.","domains":["www.sample-site-test.com","sample-site-test.com"],"expires_at":"2025-11-19"},"https_enforced":false};
}
