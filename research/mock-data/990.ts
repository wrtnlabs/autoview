
import Component from "../components/990";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":"event_1_test","type":"PagesEvent","actor":{"id":101,"login":"sample-user","display_login":"Sample User","gravatar_id":null,"url":"https://api.example.com/users/sample-user","avatar_url":"https://www.example.com/avatars/sample-user.png"},"repo":{"id":202,"name":"example-org/sample-repo","url":"https://api.example.com/repos/example-org/sample-repo"},"payload":{"pages":[{"page_name":"HomePage (Test)","title":"Welcome to the Sample Site","summary":"This is a test page summary for UI rendering checks.","action":"created","sha":"abc123testsha","html_url":"https://www.example.com/sample-site/HomePage.html"},{"page_name":"ContactPage (Test)","title":"Contact Us - Sample","summary":null,"action":"updated","sha":"def456testsha","html_url":"https://www.example.com/sample-site/ContactPage.html"}]},"public":true,"created_at":"2025-05-19T14:30:00Z"}];
}
