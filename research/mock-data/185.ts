
import Component from "../components/185";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"result":"Sample string value for testing the StringView component. It contains multiple lines to test rendering:\nLine 1: Sample text (Test)\nLine 2: Another sample entry."};
}
