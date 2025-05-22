
import Component from "../components/768";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"ref_name":"refs/heads/sample-branch","path":"assets/images/sample-image.png","oid":"3ac67fc9b4d5e062a7c890d1b2c3f4e5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1","size":204800},{"ref_name":"refs/tags/v1.0-test","path":"docs/test_report_sample.pdf","oid":"a1b2c3d4e5f60718293a4b5c6d7e8f901234567890abcdef1234567890abcdef","size":10485760}];
}
