
import Component from "../components/896";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"referrer":"https://www.example.com/homepage-sample","count":1423,"uniques":1287},{"referrer":"https://search.example.org/results?q=test-sample","count":953,"uniques":932},{"referrer":"https://blog.example.net/posts/sample-article-1","count":540,"uniques":512},{"referrer":"https://email.example.net/newsletter/offer-sample","count":312,"uniques":289},{"referrer":"Direct (none)","count":2021,"uniques":2019}];
}
