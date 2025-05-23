
import Component from "../components/577";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":101,"run_id":202,"run_attempt":1,"run_url":"https://api.github.com/repos/example-org/sample-repo/actions/runs/202","node_id":"NODEID_Job101_XYZabc=","head_sha":"f0e1d2c3b4a5968778695a4b3c2d1e0f98765432","url":"https://api.github.com/repos/example-org/sample-repo/actions/jobs/101","html_url":"https://github.com/example-org/sample-repo/actions/runs/202/jobs/101","status":"completed","conclusion":"success","created_at":"2025-05-19T09:00:00Z","started_at":"2025-05-19T09:05:00Z","completed_at":"2025-05-19T09:10:30Z","name":"CI Build & Unit Tests (Sample Suite)","steps":[{"status":"completed","conclusion":"success","name":"Checkout code","number":1,"started_at":"2025-05-19T09:05:00Z","completed_at":"2025-05-19T09:05:30Z"},{"status":"completed","conclusion":"success","name":"Run tests","number":2,"started_at":"2025-05-19T09:05:31Z","completed_at":"2025-05-19T09:10:00Z"}],"check_run_url":"https://api.github.com/repos/example-org/sample-repo/check-runs/345","labels":["ubuntu-latest","self-hosted"],"runner_id":555,"runner_name":"test-runner-01","runner_group_id":10,"runner_group_name":"Test Runner Group","workflow_name":"Sample Workflow (Test)","head_branch":"feature/sample-branch"};
}
