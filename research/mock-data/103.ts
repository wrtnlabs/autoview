
import Component from "../components/103";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"score":4.8,"id":"550e8400-e29b-41d4-a716-446655440000","created_at":"2025-05-19T14:30:00Z","format":"md","title":"Great Product! (Sample Review)","body":"# Sample Review for TestWidget Pro\n\nI recently purchased the **TestWidget Pro** (Model X1000) and ran it through several tests for my UI components. Overall, I'm impressed with the build quality and user experience. The performance was smooth, and the battery life lasted longer than expected. However, the companion app could use some improvements in its interface and connectivity.\n\n- Build Quality: Excellent\n- Performance: Smooth and reliable\n- Battery Life: ~12 hours under moderate use\n\nThis review is a fictional, sample entry for UI testing purposes only.","files":[{"name":"image1_sample","extension":"jpg","url":"https://www.example.com/assets/sample-review/image1_sample.jpg"},{"name":"README","extension":null,"url":"https://www.example.com/assets/sample-review/README"}]};
}
