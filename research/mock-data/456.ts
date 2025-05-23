
import Component from "../components/456";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"guid":"123e4567-e89b-12d3-a456-426614174000","delivered_at":"2025-05-19T14:30:00Z","redelivery":false,"duration":123.45,"status":"Delivered (Sample)","status_code":200,"event":"push","action":null,"installation_id":5501,"repository_id":8342},{"id":102,"guid":"223e4567-e89b-12d3-a456-426614174111","delivered_at":"2025-05-19T15:00:00Z","redelivery":true,"duration":256.78,"status":"Retry Delivery (Sample)","status_code":500,"event":"pull_request","action":"opened","installation_id":null,"repository_id":9002,"throttled_at":"2025-05-19T15:00:01Z"}];
}
