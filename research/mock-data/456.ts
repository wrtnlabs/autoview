
import Component from "../components/456";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":1,"guid":"123e4567-e89b-12d3-a456-426614174000","delivered_at":"2025-05-19T14:30:00Z","redelivery":false,"duration":150.5,"status":"Delivered","status_code":200,"event":"push","action":"created","installation_id":42,"repository_id":101},{"id":2,"guid":"223e4567-e89b-12d3-a456-426614174001","delivered_at":"2025-05-19T15:00:00Z","redelivery":true,"duration":300,"status":"Timeout","status_code":504,"event":"issues","action":null,"installation_id":null,"repository_id":202,"throttled_at":"2025-05-19T15:05:00Z"}];
}
