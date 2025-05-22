
import Component from "../components/675";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"ref":"refs/heads/feature/sample-analysis","commit_sha":"a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0","analysis_key":"ci-workflow.yml:security_scan_job","environment":"ubuntu-latest|node14 (Test)","category":"sample-category","error":"Sample processing completed without errors","created_at":"2025-05-19T15:20:30Z","results_count":25,"rules_count":10,"id":101,"url":"https://api.example.com/repos/example-org/sample-repo/code-scanning/analyses/101","sarif_id":"SARIF_TEST_ID_20250519_001","tool":{"name":"Sample Security Tool (Test)","version":"1.2.3-test","guid":"123e4567-e89b-12d3-a456-426614174000"},"deletable":true,"warning":"No warnings generated during this analysis (sample)."},{"ref":"refs/pull/42/merge","commit_sha":"fedcba9876543210fedcba9876543210fedcba98","analysis_key":"CodeQL Security Scan (Test)","environment":"CodeQL Database Export (Test)","error":"Error: SampleError occurred during SARIF upload.","created_at":"2025-05-19T16:45:00Z","results_count":0,"rules_count":0,"id":202,"url":"https://api.example.com/repos/example-org/sample-repo/code-scanning/analyses/202","sarif_id":"SARIF_TEST_ID_20250519_002","tool":{"name":"CodeQL CLI (Test)","version":null,"guid":null},"deletable":false,"warning":"Sample warning: limited rule coverage detected."}];
}
