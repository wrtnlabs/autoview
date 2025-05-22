
import Component from "../components/946";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"email":"test.user@example.com","primary":true,"verified":true,"visibility":"public"},{"email":"developer.account@example.org","primary":false,"verified":false,"visibility":"private"},{"email":"sample.email@example.net","primary":false,"verified":true,"visibility":null}];
}
