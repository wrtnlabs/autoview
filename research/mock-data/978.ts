
import Component from "../components/978";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"provider":"Twitter (Test)","url":"https://twitter.com/sample_user_test"},{"provider":"LinkedIn (Sample)","url":"https://www.linkedin.com/in/sample-profile-test"},{"provider":"GitHub (Test)","url":"https://github.com/example-user-sample"}];
}
