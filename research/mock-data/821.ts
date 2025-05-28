
import Component from "../components/821";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"domain":{"host":"test-pages-sample.example.com","uri":"https://test-pages-sample.example.com","nameservers":"ns1.example.org, ns2.example.org","dns_resolves":true,"is_proxied":false,"is_cloudflare_ip":false,"is_fastly_ip":false,"is_old_ip_address":false,"is_a_record":true,"has_cname_record":false,"has_mx_records_present":false,"is_valid_domain":true,"is_apex_domain":true,"should_be_a_record":true,"is_cname_to_github_user_domain":null,"is_cname_to_pages_dot_github_dot_com":null,"is_cname_to_fastly":null,"is_pointed_to_github_pages_ip":true,"is_non_github_pages_ip_present":false,"is_pages_domain":true,"is_served_by_pages":true,"is_valid":true,"reason":null,"responds_to_https":true,"enforces_https":true,"https_error":null,"is_https_eligible":true,"caa_error":null},"alt_domain":null};
}
