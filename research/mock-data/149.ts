
import Component from "../components/149";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"comment_12345_sample","created_at":"2025-05-20T12:34:56Z","format":"md","body":"# Sample Comment\n\nThis is a *test* comment body for UI rendering. All content is fictional and for demonstration purposes.\n\n- Item A: Example detail\n- Item B: Another detail","files":[{"name":"screenshot","extension":"png","url":"https://www.example.com/assets/screenshot.png"},{"name":"README","extension":null,"url":"https://www.example.com/assets/README"}]};
}
