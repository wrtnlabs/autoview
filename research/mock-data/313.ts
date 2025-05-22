
import Component from "../components/313";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":10123,"guid":"123e4567-e89b-12d3-a456-426614174000","delivered_at":"2025-05-19T14:30:00Z","redelivery":false,"duration":120,"status":"Delivered","status_code":200,"event":"push","action":null,"installation_id":123456789,"repository_id":654321987,"throttled_at":"2025-05-19T15:00:00Z"},{"id":20234,"guid":"987e6543-e21b-65d4-b716-abcdef123456","delivered_at":"2025-05-19T15:45:30Z","redelivery":true,"duration":300,"status":"TimeoutError: Request timed out","status_code":504,"event":"pull_request","action":"opened","installation_id":null,"repository_id":null}];
}
