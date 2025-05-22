
import Component from "../components/816";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"url":"https://www.example.com/sample-page.html","status":"success"};
}
