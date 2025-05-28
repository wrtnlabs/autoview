
import Component from "../components/628";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"name":"feature/sample-blueprint","commit":{"sha":"a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0","url":"https://api.example.com/repos/example-org/sample-repo/commits/a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0"},"protected":false},{"name":"release/v1.0-test","commit":{"sha":"f0e1d2c3b4a5968778695a4b3c2d1e0f98765432","url":"https://api.example.com/repos/example-org/sample-repo/commits/f0e1d2c3b4a5968778695a4b3c2d1e0f98765432"},"protected":true,"protection_url":"https://api.example.com/repos/example-org/sample-repo/branches/release%2Fv1.0-test/protection","protection":{"url":"https://api.example.com/repos/example-org/sample-repo/branches/release%2Fv1.0-test/protection","enabled":true,"name":"release/v1.0-test","protection_url":"https://api.example.com/repos/example-org/sample-repo/branches/release%2Fv1.0-test/protection","required_status_checks":{"contexts":["ci/test-suite","security/scan"],"checks":[{"context":"ci/test-suite","app_id":12345},{"context":"security/scan","app_id":null}]},"enforce_admins":{"url":"https://api.example.com/repos/example-org/sample-repo/branches/release%2Fv1.0-test/enforce_admins","enabled":false},"required_signatures":{"url":"https://api.example.com/repos/example-org/sample-repo/branches/release%2Fv1.0-test/required_signatures","enabled":true}}}];
}
