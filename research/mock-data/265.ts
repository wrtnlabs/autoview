
import Component from "../components/265";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"signedUrl":"https://cdn.example.com/recordings/test-recording-12345?token=sampleSignedToken123"};
}
