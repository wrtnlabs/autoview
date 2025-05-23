
import Component from "../components/750";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"content":"SGVsbG8sIHRoaXMgaXMgYSBTYW1wbGUgQmxvYiBjb250ZW50Lg==","encoding":"base64","url":"https://www.example.com/sample-blob.dat","sha":"3b18e2c4d5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0","size":1024,"node_id":"MDQ6TW9ja0Jsb2I6YWJjLTEyMzQ1","highlighted_content":"<span lang=\"text\">SGVsbG8sIHRoaXMgaXMgYSBTYW1wbGUgQmxvYiE=</span>"};
}
