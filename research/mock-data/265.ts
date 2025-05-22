
import Component from "../components/265";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"signedUrl":"https://api.example.com/v1/recordings/sample-recording.mp4?signature=sample_signature_ABC123"};
}
