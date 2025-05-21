
import Component from "../components/328";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"key":"contributor_covenant","name":"Contributor Covenant Code of Conduct (Sample)","url":"https://api.example.com/repos/example-org/sample-repo/community/code_of_conduct","body":"This is a sample Code of Conduct for demonstration purposes. All participants are expected to follow these fictional guidelines to ensure a positive and inclusive environment. Assets and behaviors depicted are not legally binding and are intended only for UI testing.","html_url":"https://www.example.com/community/code_of_conduct/contributor_covenant"},{"key":"custom_test_policy","name":"Custom Test Code of Conduct (Test)","url":"https://api.example.org/repos/sample-org/custom-repo/community/code_of_conduct/custom_test_policy","html_url":null}];
}
