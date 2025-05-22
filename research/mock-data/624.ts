
import Component from "../components/624";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":42,"key_prefix":"JIRA","url_template":"https://jira.example.com/browse/{key}","is_alphanumeric":true},{"id":43,"key_prefix":"#","url_template":"https://issues.example.org/{key}","is_alphanumeric":false},{"id":44,"key_prefix":"DOC","url_template":"https://docs.example.com/{key}","is_alphanumeric":true}];
}
