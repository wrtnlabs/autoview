
import Component from "../components/328";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"key":"default","name":"Default Code of Conduct (Sample)","url":"https://www.example.com/code-of-conduct/default","body":"Please be respectful to all participants. This is a sample Code of Conduct body used for UI testing purposes only.","html_url":"https://www.example.com/code-of-conduct/default.html"},{"key":"cla","name":"Contributor License Agreement (Sample)","url":"https://example.org/code-of-conduct/cla","html_url":null}];
}
