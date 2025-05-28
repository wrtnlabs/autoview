
import Component from "../components/762";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"guid":"a1b2c3d4-e5f6-7890-ab12-cd34ef56gh78","delivered_at":"2025-05-19T14:45:00Z","redelivery":false,"duration":120.5,"status":"200 OK (Sample)","status_code":200,"event":"push","action":null,"installation_id":5555,"repository_id":987654,"throttled_at":null},{"id":102,"guid":"z9y8x7w6-v5u4-3210-ts12-rq34po56nm78","delivered_at":"2025-05-19T15:00:00Z","redelivery":true,"duration":250,"status":"502 Bad Gateway (Simulated)","status_code":502,"event":"issues","action":"opened","installation_id":null,"repository_id":123456,"throttled_at":"2025-05-19T15:05:00Z"}];
}
