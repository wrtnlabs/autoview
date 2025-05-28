
import Component from "../components/265";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"signedUrl":"https://storage.example.com/recordings/sample-recording-1234?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=test%2F20250519%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250519T120000Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890"};
}
