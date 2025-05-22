
import Component from "../components/762";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":10123,"guid":"123e4567-e89b-12d3-a456-426614174000-sample","delivered_at":"2025-05-19T12:34:56Z","redelivery":false,"duration":135.2,"status":"Success (Sample)","status_code":200,"event":"push","action":null,"installation_id":555,"repository_id":7890},{"id":10124,"guid":"223e4567-e89b-12d3-a456-426614174001-sample","delivered_at":"2025-05-20T09:15:00Z","redelivery":true,"duration":250,"status":"Failed (Sample Timeout)","status_code":504,"event":"issues","action":"opened","installation_id":null,"repository_id":null,"throttled_at":"2025-05-20T09:20:00Z"}];
}
