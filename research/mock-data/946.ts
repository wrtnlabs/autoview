
import Component from "../components/946";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"email":"test.user@example.com","primary":true,"verified":true,"visibility":"public"},{"email":"dev.account@example.org","primary":false,"verified":true,"visibility":"private"},{"email":"contact.sample@example.net","primary":false,"verified":false,"visibility":null}];
}
