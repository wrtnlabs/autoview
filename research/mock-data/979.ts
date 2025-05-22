
import Component from "../components/979";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"provider":"Twitter","url":"https://twitter.com/sample_user_test"},{"provider":"LinkedIn","url":"https://www.linkedin.com/in/sample-user-test"},{"provider":"GitHub","url":"https://github.com/sample-user-test"}];
}
