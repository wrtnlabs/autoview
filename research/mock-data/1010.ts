
import Component from "../components/1010";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"provider":"Twitter","url":"https://twitter.com/test_user_sample"},{"provider":"LinkedIn","url":"https://www.linkedin.com/in/test-user-sample"},{"provider":"Facebook","url":"https://www.facebook.com/test.user.sample"}];
}
