
import Component from "../components/642";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return ["config.yaml (Sample)","README.md (Test)","app.js (Dummy)","style.css (Sample)","index.html (UI Test)"];
}
