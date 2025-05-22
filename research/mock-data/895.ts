
import Component from "../components/895";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"path":"/home","title":"Homepage (Sample)","count":2500,"uniques":1500},{"path":"/blog/test-post-alpha","title":"Test Post Alpha (Demo)","count":125,"uniques":100},{"path":"/pricing","title":"Pricing Page (Test)","count":875,"uniques":650}];
}
