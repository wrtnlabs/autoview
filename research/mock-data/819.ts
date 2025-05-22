
import Component from "../components/819";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"f0e1d2c3b4a5968778695a4b3c2d1e0f98765432","status_url":"https://api.github.com/repos/example-org/sample-repo/pages/deployment/f0e1d2c3b4a5968778695a4b3c2d1e0f98765432/status","page_url":"https://example-org.github.io/sample-repo","preview_url":"https://example-org.github.io/sample-repo?preview=true&ref=feature/test-preview"};
}
