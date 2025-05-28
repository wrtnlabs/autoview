
import Component from "../components/749";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"url":"https://api.example.com/v1/short-blobs/sample-blob-789","sha":"3b2a1c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b"};
}
