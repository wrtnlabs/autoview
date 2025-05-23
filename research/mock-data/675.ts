
import Component from "../components/675";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"ref":"refs/pull/42/head","commit_sha":"abc123def4567890abc123def4567890abc12345","analysis_key":"GitHub Actions / CodeQL Scan","environment":"GitHub Actions (Ubuntu Latest)","category":"security","error":"","created_at":"2025-05-19T14:30:00Z","results_count":12,"rules_count":4,"id":101,"url":"https://api.example.com/code-scanning/analyses/101","sarif_id":"SARIF_TEST_001","tool":{"name":"SampleSecurityAnalyzer","version":"1.0.0-test","guid":"00000000-0000-0000-0000-000000000001"},"deletable":true,"warning":"No warning (Test)"},{"ref":"refs/heads/feature/mock-data-generation","commit_sha":"1234567890abcdef1234567890abcdef12345678","analysis_key":"CLI:CustomRunner:CoverageScan","environment":"Local Runner (Test)","error":"Timeout reading SARIF file (Test)","created_at":"2025-05-18T09:15:30Z","results_count":0,"rules_count":0,"id":102,"url":"https://api.example.com/code-scanning/analyses/102","sarif_id":"SARIF_TEST_002","tool":{"name":"CoverageScanner","version":null,"guid":null},"deletable":false,"warning":"SampleWarning: Incomplete results"}];
}
