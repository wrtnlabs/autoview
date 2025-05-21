
import Component from "../components/51";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"setHeaders":{"Authorization":"Bearer test_auth_token_ABC123"},"token":{"access":"access_token_sample_123456","refresh":"refresh_token_sample_654321","expired_at":"2025-05-19T15:00:00Z","refreshable_until":"2025-06-19T15:00:00Z"},"type":"customer","member":null,"citizen":null,"id":"cust_1234567890","channel":{"id":"chan_9876543210","created_at":"2024-12-01T08:00:00Z","code":"WEB_STORE_TEST","name":"Web Store Demo Channel"},"external_user":null,"href":"https://shop.example.com/cart/test-session","referrer":"https://www.example.com/homepage","ip":"192.0.2.123","created_at":"2025-05-19T14:45:30Z"};
}
