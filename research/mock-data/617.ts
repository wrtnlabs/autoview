
import Component from "../components/617";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"workflows":[{"id":101,"node_id":"MDg6V29ya2Zsb3dfMTAx","name":"CI Pipeline (Sample)","path":".github/workflows/ci-pipeline.yml","state":"active","created_at":"2025-05-19T09:00:00Z","updated_at":"2025-05-19T10:15:00Z","url":"https://api.github.com/repos/example-org/sample-repo/actions/workflows/101","html_url":"https://github.com/example-org/sample-repo/blob/main/.github/workflows/ci-pipeline.yml","badge_url":"https://github.com/example-org/sample-repo/workflows/CI%20Pipeline/badge.svg"},{"id":202,"node_id":"MDg6V29ya2Zsb3dfMjAy","name":"Deploy to Staging (Test)","path":".github/workflows/deploy-staging.yml","state":"deleted","created_at":"2024-12-01T08:30:00Z","updated_at":"2025-01-02T12:00:00Z","url":"https://api.github.com/repos/example-org/sample-repo/actions/workflows/202","html_url":"https://github.com/example-org/sample-repo/blob/main/.github/workflows/deploy-staging.yml","badge_url":"https://github.com/example-org/sample-repo/workflows/Deploy%20to%20Staging/badge.svg","deleted_at":"2025-03-15T14:45:00Z"}]};
}
