
import Component from "../components/124";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"publish_id":"pub_1001_sample","good_id":"good_500A_sample","stock_id":"stock_200B_sample","quantity":3},{"publish_id":"pub_1002_sample","good_id":"good_500B_sample","stock_id":"stock_200C_sample","quantity":1.5}];
}
