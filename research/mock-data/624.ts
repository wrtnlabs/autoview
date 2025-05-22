
import Component from "../components/624";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":42,"key_prefix":"ISSUE-","url_template":"https://tracker.example.com/issues/{key}","is_alphanumeric":true},{"id":43,"key_prefix":"BUG-","url_template":"https://tickets.example.com/bugs/{key}","is_alphanumeric":false},{"id":44,"key_prefix":"JIRA-","url_template":"https://jira.example.org/browse/{key}","is_alphanumeric":true}];
}
