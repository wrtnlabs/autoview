
import Component from "../components/625";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":1024,"key_prefix":"ISSUE-","url_template":"https://tracker.example.com/browse/${key_prefix}${id}","is_alphanumeric":true};
}
