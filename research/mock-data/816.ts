
import Component from "../components/816";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"url":"https://api.example.com/v1/page-builds/sample-001/status","status":"completed"};
}
