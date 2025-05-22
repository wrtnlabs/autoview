
import Component from "../components/1005";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":"EVT_98765","type":"GollumEvent","actor":{"id":101,"login":"test-contributor","display_login":"Test Contributor","gravatar_id":"","url":"https://api.example.com/users/test-contributor","avatar_url":"https://avatars.example.com/test-contributor.png"},"repo":{"id":501,"name":"sample-repo","url":"https://api.example.com/repos/example-org/sample-repo"},"org":{"id":201,"login":"example-org","gravatar_id":"","url":"https://api.example.com/users/example-org","avatar_url":"https://avatars.example.com/example-org.png"},"payload":{"pages":[{"page_name":"HomePage","title":"Home Page (Test)","summary":"Initial creation of the home page for UI test.","action":"created","sha":"a1b2c3d4e5f6g7h8i9j0","html_url":"https://www.example.com/example-org/sample-repo/wiki/HomePage"},{"page_name":"About","title":"About Us (Sample)","summary":null,"action":"edited","sha":"0j9i8h7g6f5e4d3c2b1a","html_url":"https://www.example.com/example-org/sample-repo/wiki/About"}]},"public":true,"created_at":"2025-05-19T12:34:56Z"}];
}
