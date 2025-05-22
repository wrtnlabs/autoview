
import Component from "../components/625";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":12345,"key_prefix":"TASK-","url_template":"https://tracker.example.com/tasks/{key}","is_alphanumeric":true};
}
