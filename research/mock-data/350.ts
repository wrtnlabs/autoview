
import Component from "../components/350";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":67890,"node_id":"MDQ6R2lzdENvbW1lbnQ3Njg5MA==","url":"https://api.github.com/gists/12345/comments/67890","body":"This is a sample gist comment body for UI testing purposes. It could contain multiple lines.\nHere's another line for testing formatting.","user":{"name":"Test User (Sample)","email":"test.user@example.com","login":"sample-user","id":1001,"node_id":"NODEID_SampleUser_abc123==","avatar_url":"https://example.com/avatar/sample-user.png","gravatar_id":null,"url":"https://api.github.com/users/sample-user","html_url":"https://github.com/sample-user","followers_url":"https://api.github.com/users/sample-user/followers","following_url":"https://api.github.com/users/sample-user/following{/other_user}","gists_url":"https://api.github.com/users/sample-user/gists{/gist_id}","starred_url":"https://api.github.com/users/sample-user/starred{/owner}{/repo}","subscriptions_url":"https://api.github.com/users/sample-user/subscriptions","organizations_url":"https://api.github.com/users/sample-user/orgs","repos_url":"https://api.github.com/users/sample-user/repos","events_url":"https://api.github.com/users/sample-user/events{/privacy}","received_events_url":"https://api.github.com/users/sample-user/received_events","type":"User","site_admin":false,"starred_at":"2025-05-18T08:30:00Z","user_view_type":"SampleView"},"created_at":"2025-05-18T15:45:00Z","updated_at":"2025-05-19T09:20:00Z","author_association":"CONTRIBUTOR"};
}
