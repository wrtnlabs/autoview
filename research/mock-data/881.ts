
import Component from "../components/881";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"author":{"name":"Sample Contributor (Test)","email":"sample.contrib@example.com","login":"sample-contrib","id":123456,"node_id":"MDQ6VXNlcjEyMzQ1Ng==","avatar_url":"https://avatars.example.com/u/123456?v=4","gravatar_id":null,"url":"https://api.example.com/users/sample-contrib","html_url":"https://www.example.com/sample-contrib","followers_url":"https://api.example.com/users/sample-contrib/followers","following_url":"https://api.example.com/users/sample-contrib/following{/other_user}","gists_url":"https://api.example.com/users/sample-contrib/gists{/gist_id}","starred_url":"https://api.example.com/users/sample-contrib/starred{/owner}{/repo}","subscriptions_url":"https://api.example.com/users/sample-contrib/subscriptions","organizations_url":"https://api.example.com/users/sample-contrib/orgs","repos_url":"https://api.example.com/users/sample-contrib/repos","events_url":"https://api.example.com/users/sample-contrib/events{/privacy}","received_events_url":"https://api.example.com/users/sample-contrib/received_events","type":"User","site_admin":false,"starred_at":"2025-05-19T14:30:00Z","user_view_type":"detailed"},"total":17,"weeks":[{"w":1716086400,"a":5,"d":1,"c":10},{"w":1716691200,"a":0,"d":0,"c":0},{"a":2,"d":1}]},{"author":null,"total":0,"weeks":[{"w":1717296000,"a":0,"d":0,"c":0}]}];
}
