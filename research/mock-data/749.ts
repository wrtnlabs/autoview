
import Component from "../components/749";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"url":"https://cdn.example.com/short_blobs/sample_blob_001","sha":"3f4a1b2c5d6e7f8890a1b2c3d4e5f6a7b8c9d0ef"};
}
