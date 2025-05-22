
import Component from "../components/896";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"referrer":"https://www.example.com/sample-page","count":1520,"uniques":420},{"referrer":"https://search.example.org/query?q=test","count":870,"uniques":310},{"referrer":"https://social.example.net/profile/test-user","count":430,"uniques":275},{"referrer":"Direct / (none)","count":1025,"uniques":1025}];
}
