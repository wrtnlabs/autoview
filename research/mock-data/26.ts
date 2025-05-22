
import Component from "../components/26";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"snapshot_00123_test","created_at":"2025-06-01T09:15:30Z","format":"html","body":"<p>Thank you for your inquiry regarding our summer sale. Please review the attached files for details. This is a <strong>sample</strong> comment body for UI testing purposes.</p>","files":[{"name":"sample-discount","extension":"pdf","url":"https://www.example.com/files/sample-discount-test.pdf"},{"name":"README","extension":null,"url":"https://www.example.com/files/README-sample"}]};
}
