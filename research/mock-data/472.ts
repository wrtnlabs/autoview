
import Component from "../components/472";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":1024,"login":"new-contributor","email":"new.contributor@example.com","role":"member","created_at":"2025-05-19T14:30:00Z","inviter":{"name":"Sample Inviter (Test Account)","email":"inviter@example.org","login":"inviter-user","id":2048,"node_id":"MDQ6VXNlcjIwNDg=","avatar_url":"https://avatars.example.com/u/2048?v=4","gravatar_id":null,"url":"https://api.example.com/users/inviter-user","html_url":"https://www.example.com/inviter-user","followers_url":"https://api.example.com/users/inviter-user/followers","following_url":"https://api.example.com/users/inviter-user/following{/other_user}","gists_url":"https://api.example.com/users/inviter-user/gists{/gist_id}","starred_url":"https://api.example.com/users/inviter-user/starred{/owner}{/repo}","subscriptions_url":"https://api.example.com/users/inviter-user/subscriptions","organizations_url":"https://api.example.com/users/inviter-user/orgs","repos_url":"https://api.example.com/users/inviter-user/repos","events_url":"https://api.example.com/users/inviter-user/events{/privacy}","received_events_url":"https://api.example.com/users/inviter-user/received_events","type":"User","site_admin":false,"starred_at":"2025-05-18T10:15:30Z","user_view_type":"public"},"team_count":3,"node_id":"MDI6SW52aXRhdGlvbjEwMjQ=","invitation_teams_url":"https://api.example.com/orgs/sample-org/invitations/1024/teams","invitation_source":"web"};
}
