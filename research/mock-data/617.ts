
import Component from "../components/617";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":2,"workflows":[{"id":101,"node_id":"MDEyOk9yZ2FnaW5ld3M6MTAx","name":"CI Build (Test)","path":".github/workflows/ci-build.yml","state":"active","created_at":"2024-10-01T08:30:00Z","updated_at":"2025-05-18T14:15:00Z","url":"https://api.github.com/repos/example-org/sample-repo/actions/workflows/ci-build.yml","html_url":"https://github.com/example-org/sample-repo/blob/main/.github/workflows/ci-build.yml","badge_url":"https://github.com/example-org/sample-repo/workflows/CI%20Build%20(Test)/badge.svg"},{"id":202,"node_id":"MDEyOk9yZ2FnaW5ld3M6MjAy","name":"Deprecated Release Flow (Sample)","path":".github/workflows/release-deprecated.yml","state":"deleted","created_at":"2023-06-15T10:00:00Z","updated_at":"2024-01-20T09:45:00Z","url":"https://api.github.com/repos/example-org/sample-repo/actions/workflows/release-deprecated.yml","html_url":"https://github.com/example-org/sample-repo/blob/main/.github/workflows/release-deprecated.yml","badge_url":"https://github.com/example-org/sample-repo/workflows/Deprecated%20Release%20Flow/badge.svg","deleted_at":"2025-04-01T16:00:00Z"}]};
}
