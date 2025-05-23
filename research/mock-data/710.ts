
import Component from "../components/710";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"health_percentage":68,"description":"This is a sample community profile description for UI testing purposes. All data is fictional.","documentation":"https://docs.example.org/community_profile","files":{"code_of_conduct":{"url":"https://example.com/CODE_OF_CONDUCT_sample","key":"community","name":"Community Code of Conduct (Sample)","html_url":"https://example.com/community_coc.html"},"code_of_conduct_file":{"url":"https://raw.githubusercontent.com/example-org/sample-repo/main/CODE_OF_CONDUCT.md","html_url":"https://github.com/example-org/sample-repo/blob/main/CODE_OF_CONDUCT.md"},"license":{"key":"mit","name":"MIT License (Test)","url":"https://example.com/licenses/MIT","spdx_id":"MIT","node_id":"MDc6TGljZW5zZW1pdA==","html_url":"https://example.com/licenses/MIT.html"},"contributing":null,"readme":{"url":"https://raw.githubusercontent.com/example-org/sample-repo/main/README.md","html_url":"https://github.com/example-org/sample-repo/blob/main/README.md"},"issue_template":null,"pull_request_template":{"url":"https://raw.githubusercontent.com/example-org/sample-repo/main/PULL_REQUEST_TEMPLATE.md","html_url":"https://github.com/example-org/sample-repo/blob/main/PULL_REQUEST_TEMPLATE.md"}},"updated_at":"2025-05-19T15:00:00Z","content_reports_enabled":true};
}
