
import Component from "../components/453";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":123,"url":"https://api.example.com/org/hooks/123","ping_url":"https://api.example.com/org/hooks/123/pings","deliveries_url":"https://api.example.com/org/hooks/123/deliveries","name":"Sample Org Hook (Test)","events":["push","pull_request","issues"],"active":true,"config":{"url":"https://webhook-handler.example.com/hook-endpoint","insecure_ssl":"0","content_type":"json","secret":"dummy_secret_ABC123"},"updated_at":"2025-05-19T12:30:00Z","created_at":"2025-05-19T12:00:00Z","type":"organization"};
}
