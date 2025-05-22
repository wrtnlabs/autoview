
import Component from "../components/749";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"url":"https://api.example.com/blobs/sample_short_blob.bin","sha":"f0e1d2c3b4a5968778695a4b3c2d1e0f98765432"};
}
