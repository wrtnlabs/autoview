
import Component from "../components/675";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"ref":"refs/pull/42/merge","commit_sha":"a1b2c3d4e5f67890abcdef1234567890abcdef12","analysis_key":"ci/test-scan-job-1","environment":"GitHub Actions (Ubuntu-latest)","category":"TypeScript-Linter (Sample)","error":"No error (sample)","created_at":"2025-05-19T14:30:00Z","results_count":5,"rules_count":3,"id":101,"url":"https://api.github.com/repos/example-org/sample-repo/code-scanning/analyses/101","sarif_id":"sarif-sample-001","tool":{"name":"ESLint (Sample)","version":"7.32.0-sample","guid":"123e4567-e89b-12d3-a456-426614174000"},"deletable":false,"warning":"No warnings (sample)"},{"ref":"refs/heads/main","commit_sha":"deadbeefdeadbeefdeadbeefdeadbeefdeadbeef","analysis_key":"security-scan","environment":"Custom Scanner (DummyEnv)","error":"SampleError: Scan process timed out (simulated)","created_at":"2025-05-18T09:15:00Z","results_count":0,"rules_count":10,"id":102,"url":"https://api.example.com/v1/test-scans/security/102","sarif_id":"sarif-sample-002","tool":{"name":"CodeQL (Test)","version":null,"guid":null},"deletable":true,"warning":"Scan completed with warnings: Timeout on rule memory-consumption (sample)"}];
}
