
import Component from "../components/124";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"publish_id":"sample-order-publish-id-001","good_id":"sample-order-good-id-123","stock_id":"sample-stock-id-456","quantity":10},{"publish_id":"sample-order-publish-id-002","good_id":"sample-order-good-id-456","stock_id":"sample-stock-id-789","quantity":2.5}];
}
