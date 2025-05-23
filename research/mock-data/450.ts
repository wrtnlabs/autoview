
import Component from "../components/450";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"url":"https://api.example.com/orgs/sample-org/hooks/101","ping_url":"https://api.example.com/orgs/sample-org/hooks/101/pings","deliveries_url":"https://api.example.com/orgs/sample-org/hooks/101/deliveries?limit=50","name":"Sample Org Hook (Test)","events":["push","pull_request"],"active":true,"config":{"url":"https://webhook.endpoint.example.org/payload","insecure_ssl":"0","content_type":"json","secret":"test_secret_abcdef1234"},"created_at":"2025-05-15T12:00:00Z","updated_at":"2025-05-16T08:30:00Z","type":"Organization"},{"id":102,"url":"https://api.example.com/repos/example-repo/hooks/102","ping_url":"https://api.example.com/repos/example-repo/hooks/102/pings","name":"Issue Events Hook (Sample)","events":["issues"],"active":false,"config":{"content_type":"json","secret":"dummy_secret_xyz789"},"created_at":"2025-05-10T09:15:00Z","updated_at":"2025-05-12T11:45:00Z","type":"Repository"}];
}
