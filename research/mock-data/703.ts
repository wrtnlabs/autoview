
import Component from "../components/703";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"name":"feature/sample-UI-test","commit":{"sha":"a1b2c3d4e5f67890abcdef1234567890abcdef12","url":"https://api.example.com/commits/a1b2c3d4e5f67890abcdef1234567890abcdef12"},"protected":false},{"name":"release/v1.2.3-test","commit":{"sha":"deadbeefdeadbeefdeadbeefdeadbeefdeadbeef","url":"https://api.example.com/commits/deadbeefdeadbeefdeadbeefdeadbeefdeadbeef"},"protected":true},{"name":"bugfix/dummy-issue-fix","commit":{"sha":"1234567890abcdef1234567890abcdef12345678","url":"https://api.example.com/commits/1234567890abcdef1234567890abcdef12345678"},"protected":false}];
}
