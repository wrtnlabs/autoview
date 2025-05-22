
import Component from "../components/329";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"key":"contributor_covenant","name":"Contributor Covenant Code of Conduct (Sample)","url":"https://www.example.com/code_of_conducts/contributor_covenant","body":"This is a sample Code of Conduct body. All contributors are expected to follow these guidelines. This text is for UI testing purposes only and does not represent a real policy.","html_url":"https://www.example.com/code_of_conducts/contributor_covenant.html"};
}
