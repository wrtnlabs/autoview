
import Component from "../components/124";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"publish_id":"order_publish_12345_test","good_id":"order_good_98765_test","stock_id":"stock_unit_54321_test","quantity":1},{"publish_id":"order_publish_12345_test","good_id":"order_good_98766_test","stock_id":"stock_unit_54322_test","quantity":2.5},{"publish_id":"order_publish_12345_test","good_id":"order_good_98767_test","stock_id":"stock_unit_54323_test","quantity":0.75}];
}
