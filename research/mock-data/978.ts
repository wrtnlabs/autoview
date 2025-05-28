
import Component from "../components/978";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"provider":"Twitter","url":"https://twitter.com/sample_user_test"},{"provider":"Facebook","url":"https://www.facebook.com/sample.user.test"},{"provider":"LinkedIn","url":"https://www.linkedin.com/in/sample-user-test"},{"provider":"Instagram","url":"https://www.instagram.com/sample_user_test/"}];
}
