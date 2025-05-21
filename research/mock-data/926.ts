
import Component from "../components/926";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":42,"title":"Test Record (Sample)","description":"A fictional description for UI testing. All content is sample-only.","isEnabled":false,"createdAt":"2025-05-19T14:30:00Z","owner":{"login":"test-owner-sample","email":"owner.sample@example.com"},"link":"https://www.example.com/sample-path","tags":["tester","ui-mock","sample-data"],"values":[1,2,3,5,8],"settings":{"featureFlag":"enabled","threshold":0.75,"options":null},"history":[{"date":"2025-05-18T10:00:00Z","action":"created"},{"date":"2025-05-19T14:00:00Z","action":"updated","by":"Sample Contributor (Bot Account)"}],"count":3,"nullField":null,"extra":{"nestedArray":[{"sample":true}]}};
}
