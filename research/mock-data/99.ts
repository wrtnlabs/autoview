
import Component from "../components/99";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"snapshot_001_test","created_at":"2025-05-19T14:30:00Z","format":"md","body":"# Sample Inquiry Comment (Test)\n\nThis is a *sample* comment body used for UI testing. It includes **bold**, _italic_, and [link](https://www.example.com) formatting. Lorem ipsum dolor sit amet, consectetur adipiscing elit. All content herein is fictional and for demonstration only.","files":[{"name":"sample-report","extension":"pdf","url":"https://www.example.com/files/sample-report.pdf"},{"name":"README","extension":null,"url":"https://www.example.com/files/README"}]};
}
