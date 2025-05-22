
import Component from "../components/313";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"guid":"e7e4c2a1-1234-4bcd-8aaa-1f2e3d4c5b6a","delivered_at":"2025-06-01T12:34:56Z","redelivery":false,"duration":150.5,"status":"Delivered sample payload","status_code":200,"event":"push","action":"created","installation_id":12345,"repository_id":67890,"throttled_at":null},{"id":102,"guid":"a1b2c3d4-5678-4ef0-9abc-0def12345678","delivered_at":"2025-06-01T12:36:00Z","redelivery":true,"duration":300,"status":"Failed sample delivery","status_code":500,"event":"pull_request","action":null,"installation_id":null,"repository_id":null}];
}
