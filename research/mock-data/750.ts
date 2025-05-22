
import Component from "../components/750";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"content":"function testSample() {\n  console.log(\"Hello, Sample World!\");\n}\n// This is fictional blob content for UI testing.","encoding":"utf-8","url":"https://api.example.com/v1/test-items/sample-blob.txt","sha":"a1b2c3d4e5f6a7b8c9d0ef1234567890abcdef12","size":2048,"node_id":"NODEID_SampleBlob_12345XYZ==","highlighted_content":"<pre><code>function testSample() { console.log(\\\"Hello, Sample World!\\\"); }</code></pre>"};
}
