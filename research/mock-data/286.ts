
import Component from "../components/286";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"commentType":"response","parentCommentId":1234,"content":"This is a sample reply comment for UI testing purposes. All content is fictional and for demonstration only.","author":{"id":1001,"name":"Test User (Dev)","email":"test.user@example.com"},"createdAt":"2025-05-19T14:30:00Z","attachments":[{"type":"image","url":"https://www.example.com/images/sample-image-01.png"}]};
}
