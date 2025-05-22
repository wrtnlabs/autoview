
import Component from "../components/896";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"referrer":"direct","count":1500,"uniques":1200},{"referrer":"https://search.example.com","count":2300,"uniques":1800},{"referrer":"https://referral.example.org/promo","count":800,"uniques":650}];
}
