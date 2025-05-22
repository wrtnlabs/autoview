
import Component from "../components/858";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"name":"Sample Repository Rule (Test)","type":"repository_rule","conditions":{"branches":["main","develop"],"file_paths":["src/","docs/"]},"actions":{"merge":"allow_auto_merge","require_reviews":true,"required_reviewers":1},"created_at":"2025-05-19T09:00:00Z","updated_at":"2025-05-19T12:30:00Z","url":"https://api.example.com/v1/repo-rules/101"},{"id":102,"name":"Dummy Branch Protection Rule (Sample)","type":"repository_rule","conditions":{"branches":["release/*"],"file_paths":["*"]},"actions":{"merge":"block_merge","require_reviews":false,"required_reviewers":0},"created_at":"2025-05-18T15:20:00Z","updated_at":"2025-05-19T10:45:00Z","url":"https://api.example.com/v1/repo-rules/102"}];
}
