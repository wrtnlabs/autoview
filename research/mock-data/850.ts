
import Component from "../components/850";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"name":"Sample Release Notes v1.0.0 (Test)","body":"## Overview\nThis is a sample release notes content for testing UI components. It demonstrates markdown formatting and includes headings, lists, and code snippets.\n\n### Features\n- Added `SampleButton` component for UI preview (example only).\n- Introduced `MockDataGenerator` module to generate test data.\n\n### Bug Fixes\n- Fixed issue where mock images failed to load in the sample gallery.\n\n### Usage\n```sh\nnpm install mock-release-notes-cli\nmock-release-notes --generate\n```\n\n> Note: All data in these release notes is fictional and intended for UI testing only.\n"};
}
