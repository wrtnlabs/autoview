
import Component from "../components/762";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"guid":"550e8400-e29b-41d4-a716-446655440000","delivered_at":"2025-05-19T14:30:00Z","redelivery":false,"duration":0.256,"status":"Success","status_code":200,"event":"push","action":"synchronize","installation_id":1234,"repository_id":5678},{"id":102,"guid":"660e8400-e29b-41d4-a716-446655440001","delivered_at":"2025-05-19T15:00:00Z","redelivery":true,"duration":1.032,"status":"Failed - Timeout","status_code":504,"event":"pull_request","action":null,"installation_id":null,"repository_id":null,"throttled_at":"2025-05-19T15:00:45Z"}];
}
