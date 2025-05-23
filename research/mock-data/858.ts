
import Component from "../components/858";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"rule_name":"Require Signed Commits (Sample)","description":"Ensures all commits are GPG-signed for added security in this sample repository.","condition":{"target_type":"branch","branches":["main","release/*"]},"enforcement":"active","enforcement_level":"enforced","created_at":"2025-05-10T08:30:00Z","updated_at":"2025-05-18T16:45:00Z"},{"id":102,"rule_name":"Restrict Force Push (Sample)","description":"Blocks force pushes to protected branches to maintain commit history integrity.","condition":{"target_type":"branch","branches":["develop","hotfix/*"],"require_status_checks":{"contexts":["ci/build-sample"],"strict":true}},"enforcement":"active","enforcement_level":"enforced","created_at":"2025-05-12T12:00:00Z","updated_at":"2025-05-19T10:15:00Z"}];
}
