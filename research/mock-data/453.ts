
import Component from "../components/453";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":101,"url":"https://api.example.org/hooks/101","ping_url":"https://api.example.org/hooks/101/pings","deliveries_url":"https://api.example.org/hooks/101/deliveries","name":"Sample Org Hook (Test)","events":["push","pull_request","issues"],"active":true,"config":{"url":"https://webhook-handler.example.com/hook-endpoint","insecure_ssl":"0","content_type":"json","secret":"s3cr3t_token_dummy"},"updated_at":"2025-05-19T12:00:00Z","created_at":"2025-05-18T08:30:00Z","type":"OrganizationHook"};
}
