
import Component from "../components/295";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"record_id":1001,"user":{"name":"Sample User (Test)","email":"test.user@example.com"},"items":[{"id":1,"label":"Item A Sample","value":true},{"id":2,"label":"Item B Sample","value":false}],"settings":{"theme":"light","notifications":true,"timeout":300},"tags":["alpha_test","beta_sample"],"metadata":null,"created_at":"2025-05-19T14:30:00Z","images":{"SELECT_MORE_THAN_ONE_IMAGE":[{"src":"https://www.example.com/images/sample1.png","alt":"Sample Image 1"},{"src":"https://www.example.com/images/sample2.png","alt":"Sample Image 2"}]},"responses":{"ResponseForm_lt_Array_lt_string_gt__gt_":["Response A (Test)","Response B (Sample)"]}};
}
