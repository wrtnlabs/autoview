
import Component from "../components/313";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":1001,"guid":"a1b2c3d4-e5f6-7a8b-9c0d-e1f2a3b4c5d6","delivered_at":"2025-05-19T14:30:00Z","redelivery":false,"duration":230.45,"status":"200 OK (Sample)","status_code":200,"event":"push","action":"opened","installation_id":123456,"repository_id":9876543},{"id":1002,"guid":"f0e1d2c3-b4a5-9678-1122-334455667788","delivered_at":"2025-05-19T15:00:00Z","redelivery":true,"duration":310.12,"status":"503 Service Unavailable (Sample Retry)","status_code":503,"event":"pull_request","action":null,"installation_id":null,"repository_id":9876543,"throttled_at":"2025-05-19T15:00:05Z"}];
}
