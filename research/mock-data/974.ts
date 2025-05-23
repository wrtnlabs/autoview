
import Component from "../components/974";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"email":"primary.user@example.com","primary":true,"verified":true,"visibility":"public"},{"email":"secondary.user@example.com","primary":false,"verified":true,"visibility":"private"},{"email":"test.account@example.org","primary":false,"verified":false,"visibility":null}];
}
