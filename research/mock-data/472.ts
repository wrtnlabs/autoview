
import Component from "../components/472";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":1024,"login":"new.invitee","email":"invitee.user@example.org","role":"maintainer","created_at":"2025-05-19T14:30:00Z","failed_at":null,"failed_reason":null,"inviter":{"name":"Test Inviter (Bot Account)","email":"inviter.bot@example.com","login":"sample-inviter","id":2048,"node_id":"NODEID_User_Inviter_2048XYZ","avatar_url":"https://www.example.com/images/avatar/sample-inviter.png","gravatar_id":null,"url":"https://api.example.com/users/sample-inviter","html_url":"https://www.example.com/sample-inviter","followers_url":"https://api.example.com/users/sample-inviter/followers","following_url":"https://api.example.com/users/sample-inviter/following","gists_url":"https://api.example.com/users/sample-inviter/gists","starred_url":"https://api.example.com/users/sample-inviter/starred","subscriptions_url":"https://api.example.com/users/sample-inviter/subscriptions","organizations_url":"https://api.example.com/users/sample-inviter/orgs","repos_url":"https://api.example.com/users/sample-inviter/repos","events_url":"https://api.example.com/users/sample-inviter/events","received_events_url":"https://api.example.com/users/sample-inviter/received_events","type":"User","site_admin":false,"starred_at":"2025-05-17T12:00:00Z","user_view_type":"public"},"team_count":3,"node_id":"NODEID_OrgInvite_ABC123xyz","invitation_teams_url":"https://api.example.com/orgs/sample-org/invitations/1024/teams","invitation_source":"web"};
}
