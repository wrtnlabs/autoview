
import Component from "../components/978";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"provider":"Twitter","url":"https://twitter.com/sample_user_test"},{"provider":"LinkedIn","url":"https://www.linkedin.com/in/example-user-sample"},{"provider":"Instagram","url":"https://www.instagram.com/sample.user.test"},{"provider":"YouTube","url":"https://www.youtube.com/channel/UCsampleTestChannel"}];
}
