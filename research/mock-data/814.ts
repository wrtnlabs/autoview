
import Component from "../components/814";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"url":"https://api.example.org/repos/sample-repo/pages","status":"built","cname":"sample-test.example.com","protected_domain_state":"verified","custom_404":false,"html_url":"https://sample-test.example.com","build_type":"workflow","source":{"branch":"main","path":"/docs"},"public":true,"https_certificate":{"state":"issued","description":"Sample HTTPS certificate for testing purposes only.","domains":["sample-test.example.com","www.sample-test.example.com"],"expires_at":"2026-12-31"},"https_enforced":true};
}
