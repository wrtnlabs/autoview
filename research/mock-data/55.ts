
import Component from "../components/55";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"type":"customer","member":{"memberId":"member_98765_sample","joined_at":"2023-11-05T12:45:00Z","status":"active"},"citizen":null,"id":"customer_0001_sample","channel":{"id":"channel_WEB_001","created_at":"2022-01-10T08:00:00Z","code":"WEB_HOME","name":"Web Storefront (Sample Channel)"},"external_user":{"provider":"Google (Test)","externalId":"google_user_sample_001"},"href":"https://shop.example.com/cart?session=abc123-test","referrer":"https://www.example.com/landing-page-sample","ip":"203.0.113.42","created_at":"2025-05-19T14:30:00Z"};
}
