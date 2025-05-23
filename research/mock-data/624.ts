
import Component from "../components/624";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"key_prefix":"#","url_template":"https://example.com/issues/{{key}}","is_alphanumeric":false},{"id":102,"key_prefix":"PROJ-","url_template":"https://issue-tracker.example.org/browse/PROJ-{{key}}","is_alphanumeric":true},{"id":103,"key_prefix":"TASK-","url_template":"https://tasks.example.net/view/{{key}}","is_alphanumeric":true}];
}
