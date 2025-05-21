
import Component from "../components/56";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"type":"customer","member":{"membershipId":"member_ABC123_test","joined_at":"2024-11-01T09:15:30Z","plan":"premium_sample"},"citizen":null,"id":"cust_001_test","channel":{"id":"channel_001_test","created_at":"2023-01-15T12:00:00Z","code":"WEB_MOBILE","name":"Web Mall Channel"},"external_user":{"externalId":"ext_user_789_test","provider":"sample-oauth"},"href":"https://shop.example.com/welcome","referrer":"https://referrer.example.com/page/test","ip":"203.0.113.45","created_at":"2025-05-19T14:32:00Z"};
}
