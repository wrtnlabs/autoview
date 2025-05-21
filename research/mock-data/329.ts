
import Component from "../components/329";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"key":"sample_code_of_conduct","name":"Contributor Code of Conduct (Sample)","url":"https://www.example.com/policies/sample-code-of-conduct","body":"# Sample Code of Conduct\n\nAll participants are expected to follow these guidelines when contributing to this project.\n\n## Be Respectful\nTreat others with respect and professionalism in all interactions.\n\n## Report Issues\nReport any policy violations to the project maintainers promptly.\n\n*This document is fictional and for UI testing purposes only.*","html_url":"https://www.example.com/policies/sample-code-of-conduct.html"};
}
