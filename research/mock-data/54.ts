
import Component from "../components/54";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"type":"customer","member":null,"citizen":{"real_name":"Alice Example (Test)","mobile_verified":true,"verified_at":"2025-05-18T09:30:00Z"},"id":"cust_00001234_test","channel":{"id":"ch_1001_test","created_at":"2025-01-01T00:00:00Z","code":"WEB_GUI_TEST","name":"Web Storefront (Test)"},"external_user":{"provider":"OAuthProviderTest","external_user_id":"oauth_user_5678"},"href":"https://www.example.com/shop/customer-session-1234","referrer":"https://referrer.example.org/landing-page","ip":"192.0.2.123","created_at":"2025-05-19T14:45:00Z"};
}
