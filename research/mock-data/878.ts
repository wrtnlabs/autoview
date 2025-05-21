
import Component from "../components/878";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"login":"sample-user-01","id":1001,"node_id":"NODEID_SampleUser01=","avatar_url":"https://avatars.example.com/u/1001?v=4","html_url":"https://github.com/sample-user-01","type":"User","site_admin":false},{"login":"test-stargazer-02","id":2002,"node_id":"NODEID_TestStargazer02=","avatar_url":"https://avatars.example.com/u/2002?v=4","html_url":"https://github.com/test-stargazer-02","type":"User","site_admin":false}];
}
