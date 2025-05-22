
import Component from "../components/577";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":101,"run_id":5001,"run_url":"https://api.example.com/repos/example-org/sample-repo/actions/runs/5001","run_attempt":1,"node_id":"NODEID_SampleJob_ABC123XYZ","head_sha":"f0e1d2c3b4a5968778695a4b3c2d1e0f98765432","url":"https://api.example.com/repos/example-org/sample-repo/actions/jobs/101","html_url":"https://github.com/example-org/sample-repo/actions/runs/5001/jobs/101","status":"completed","conclusion":"success","created_at":"2025-05-19T09:55:00Z","started_at":"2025-05-19T10:00:00Z","completed_at":"2025-05-19T10:05:30Z","name":"CI Build & Test (Sample Suite)","steps":[{"status":"completed","conclusion":"success","name":"Checkout Code","number":1,"started_at":"2025-05-19T10:00:00Z","completed_at":"2025-05-19T10:00:30Z"},{"status":"completed","conclusion":"success","name":"Run Unit Tests","number":2,"started_at":"2025-05-19T10:00:31Z","completed_at":"2025-05-19T10:04:00Z"}],"check_run_url":"https://api.github.com/repos/example-org/sample-repo/check-runs/1234567890","labels":["ubuntu-latest","self-hosted","gpu-sample"],"runner_id":3001,"runner_name":"self-hosted-gpu-01","runner_group_id":400,"runner_group_name":"GPU-Runners-Test","workflow_name":"Sample CI Workflow","head_branch":"feature/sample-branch"};
}
