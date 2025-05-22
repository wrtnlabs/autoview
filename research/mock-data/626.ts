
import Component from "../components/626";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":42,"key_prefix":"ISSUE-","url_template":"https://issues.example.com/{key}","is_alphanumeric":true};
}
