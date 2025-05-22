
import Component from "../components/895";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"path":"/home","title":"Home Page (Sample)","count":1500,"uniques":1200},{"path":"/about","title":"About Us (Test Content)","count":850,"uniques":742},{"path":"/blog/mock-data-generator","title":"Blog: Introducing Mock Data Generator (Demo)","count":430,"uniques":389},{"path":"/dashboard","title":"Dashboard Overview (Sample)","count":2200,"uniques":1987}];
}
