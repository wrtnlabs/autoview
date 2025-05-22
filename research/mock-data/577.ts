
import Component from "../components/577";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":1012,"run_id":2021,"run_url":"https://api.github.com/repos/example-org/sample-repo/actions/runs/2021","run_attempt":2,"node_id":"NODEID_SampleJob_abc123XYZ=","head_sha":"f0e1d2c3b4a5968778695a4b3c2d1e0f98765432","url":"https://api.github.com/repos/example-org/sample-repo/actions/jobs/1012","html_url":"https://github.com/example-org/sample-repo/actions/runs/2021/jobs/1012","status":"completed","conclusion":"success","created_at":"2025-05-19T08:00:00Z","started_at":"2025-05-19T08:05:00Z","completed_at":"2025-05-19T08:10:30Z","name":"CI Build & Unit Tests (Sample Suite)","steps":[{"status":"completed","conclusion":"success","name":"Checkout Code","number":1,"started_at":"2025-05-19T08:05:10Z","completed_at":"2025-05-19T08:05:20Z"},{"status":"completed","conclusion":"success","name":"Run Tests","number":2,"started_at":"2025-05-19T08:05:21Z","completed_at":"2025-05-19T08:09:50Z"}],"check_run_url":"https://api.github.com/repos/example-org/sample-repo/check-runs/123456789","labels":["ubuntu-latest","self-hosted","linux"],"runner_id":8765,"runner_name":"self-hosted-runner-01 (Test)","runner_group_id":1001,"runner_group_name":"Self-Hosted Group (Test)","workflow_name":"CI Workflow (Sample)","head_branch":"feature/sample-branch"};
}
