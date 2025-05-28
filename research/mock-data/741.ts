
import Component from "../components/741";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"key_id":"sample-key-id-001","key":"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArNIq2xOjMK1iY5xn+2KOOg2YyhWMB+vZaY+4k4RZJvCzOW7jx+NWn3l8XhJDFQ+j5CNQLj8djfpSxj18xYA2qKUj+JKLdrx8r63cQFZlV7bbH2fAq5y5zlJ6h8c3YhK72xpqG2wPMu1VoYJHWGvJ8qk2xYF9N3pHSJ5rW7gUFx8sA6JLb4yGJtP0H4FdqODk587ZgVqFeAlenJZvvkQIDAQAB","id":101,"url":"https://api.example.com/actions/public-keys/101","title":"Sample Actions Public Key (Test)","created_at":"2025-05-19T14:30:00Z"};
}
