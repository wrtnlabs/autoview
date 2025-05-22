
import Component from "../components/974";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"email":"test.user@example.com","primary":true,"verified":true,"visibility":"public"},{"email":"sample.user@example.org","primary":false,"verified":true,"visibility":"private"},{"email":"dummy.user@example.net","primary":false,"verified":false,"visibility":null}];
}
