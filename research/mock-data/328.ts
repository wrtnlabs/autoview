
import Component from "../components/328";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"key":"default","name":"Default Code of Conduct (Sample)","url":"https://example.org/codes/default-code-of-conduct.md","body":"# Default Code of Conduct (Sample)\n\nAll participants must behave respectfully and professionally in all interactions.\n\n## Our Pledge\nWe commit to fostering an open and welcoming environment for everyone.\n","html_url":"https://www.example.org/codes/default-code-of-conduct.html"},{"key":"contributor_covenant","name":"Contributor Covenant (Test Version)","url":"https://example.org/codes/contributor_covenant.md","html_url":null}];
}
