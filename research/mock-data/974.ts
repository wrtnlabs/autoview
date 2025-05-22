
import Component from "../components/974";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"email":"test.user.primary@example.com","primary":true,"verified":true,"visibility":"public"},{"email":"sample.user.secondary@example.org","primary":false,"verified":false,"visibility":"private"},{"email":"integration.bot@example.net","primary":false,"verified":true,"visibility":null}];
}
