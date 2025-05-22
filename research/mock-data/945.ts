
import Component from "../components/945";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"email":"test.user@example.com","primary":true,"verified":true,"visibility":"public"},{"email":"sample.bot@example.org","primary":false,"verified":false,"visibility":"private"},{"email":"dummy.account@example.net","primary":false,"verified":true,"visibility":null}];
}
