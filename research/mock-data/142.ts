
import Component from "../components/142";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"comment_snapshot_001_test","created_at":"2025-05-19T16:45:00Z","format":"md","body":"**Sample Comment**\n\nThis is a sample markdown comment created for UI component testing purposes. It demonstrates formatting *italic*, **bold**, and lists:\n\n- Item one\n- Item two\n- Item three\n\n_All content is fictional._","files":[{"name":"screenshot","extension":"png","url":"https://www.example.com/assets/screenshot.png"},{"name":"notes","extension":"txt","url":"https://www.example.com/assets/notes.txt"}]};
}
