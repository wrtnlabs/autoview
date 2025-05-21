
import Component from "../components/750";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"content":"function helloWorld() {\n  console.log('Hello, world!');\n}\n","encoding":"utf-8","url":"https://api.example.com/repos/example-org/sample-repo/git/blobs/123456","sha":"f0e1d2c3b4a5968778695a4b3c2d1e0f98765432","size":128,"node_id":"NODEID_SampleBlob_abc123XYZ=","highlighted_content":"<mark>function helloWorld() { console.log('Hello, world!'); }</mark>"};
}
