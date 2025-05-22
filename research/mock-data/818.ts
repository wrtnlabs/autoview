
import Component from "../components/818";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"url":"https://api.github.com/repos/example-org/sample-repo/pages/builds/42","status":"built","error":{"message":null},"pusher":{"name":"Test User (Dev)","email":"test.user@example.com","login":"testuser_sample","id":5678,"node_id":"U_kgDOBexample1234567890","avatar_url":"https://avatars.githubusercontent.com/u/5678?v=4","gravatar_id":null,"url":"https://api.github.com/users/testuser_sample","html_url":"https://github.com/testuser_sample","followers_url":"https://api.github.com/users/testuser_sample/followers","following_url":"https://api.github.com/users/testuser_sample/following{/other_user}","gists_url":"https://api.github.com/users/testuser_sample/gists{/gist_id}","starred_url":"https://api.github.com/users/testuser_sample/starred{/owner}{/repo}","subscriptions_url":"https://api.github.com/users/testuser_sample/subscriptions","organizations_url":"https://api.github.com/users/testuser_sample/orgs","repos_url":"https://api.github.com/users/testuser_sample/repos","events_url":"https://api.github.com/users/testuser_sample/events{/privacy}","received_events_url":"https://api.github.com/users/testuser_sample/received_events","type":"User","site_admin":false,"starred_at":"2025-05-18T16:20:00Z","user_view_type":"detailed"},"commit":"f0e1d2c3b4a5968778695a4b3c2d1e0f98765432","duration":4500,"created_at":"2025-05-19T09:15:00Z","updated_at":"2025-05-19T09:20:30Z"};
}
