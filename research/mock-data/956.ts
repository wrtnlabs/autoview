
import Component from "../components/956";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"key":"apiKey_test_001","id":101,"url":"https://api.example.com/v1/keys/apiKey_test_001","title":"Primary API Key (Test)","created_at":"2025-05-19T14:30:00Z","verified":true,"read_only":false},{"key":"readonly_apiKey_002","id":102,"url":"https://api.example.com/v1/keys/readonly_apiKey_002","title":"Read-Only Key Sample","created_at":"2025-05-18T09:15:45Z","verified":false,"read_only":true}];
}
