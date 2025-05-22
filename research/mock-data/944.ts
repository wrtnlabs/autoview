
import Component from "../components/944";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"email":"test.user1@example.com","primary":true,"verified":true,"visibility":"public"},{"email":"secondary.contact@example.org","primary":false,"verified":false,"visibility":"private"},{"email":"notifications.sample@example.net","primary":false,"verified":true,"visibility":null}];
}
