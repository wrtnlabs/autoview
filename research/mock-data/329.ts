
import Component from "../components/329";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"key":"contributor_covenant_test","name":"Contributor Covenant Code of Conduct (Sample)","url":"https://www.example.com/docs/CODE_OF_CONDUCT.md","body":"## Contributor Covenant Code of Conduct\n\n### Our Pledge\nIn the interest of fostering an open and welcoming environment, we pledge to make participation in our project a harassment-free experience for everyone.\n\n### Our Standards\nExamples of behavior that contributes to a positive environment for our community include:\n- Using welcoming and inclusive language.\n- Being respectful of differing viewpoints and experiences.\n- Gracefully accepting constructive criticism.\n\n*This is a fictional Code of Conduct provided for UI testing purposes only.*","html_url":"https://www.example.com/CODE_OF_CONDUCT.html"};
}
