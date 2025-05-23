
import Component from "../components/1010";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"provider":"Twitter (Sample Account)","url":"https://www.example.com/social/twitter/sample_account_test"},{"provider":"LinkedIn (Test Profile)","url":"https://www.example.com/social/linkedin/sample-profile-test"},{"provider":"GitHub (Sample Account)","url":"https://www.example.com/social/github/sample-account-test"}];
}
