
import Component from "../components/119";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"type":"seller","member":{"id":"member_001_test","nickname":"test_seller_member","emails":[{"id":"member_email_001","value":"seller.member@example.com","created_at":"2025-05-18T07:00:00Z"},{"id":"member_email_002","value":"secondary@example.org","created_at":"2025-05-18T07:15:00Z"}],"created_at":"2025-05-18T07:30:00Z"},"customer":{"id":"customer_001_test","channel":{"id":"channel_01_test","created_at":"2025-05-01T12:00:00Z","code":"WEB_TEST","name":"Website (Test Channel)"},"external_user":{"id":"ext_user_001","citizen":{"id":"citizen_ext_001","created_at":"2025-05-10T12:01:00Z","mobile":"+1-555-222-0001","name":"Ext User Test"},"created_at":"2025-05-10T12:01:30Z","uid":"extuid123","application":"SOCIAL_TEST_APP","nickname":"social_user_01","data":{"provider":"TestSocial","profile_url":"https://api.example.com/social/sample"}},"href":"https://www.example.com/shop?session=mock123","referrer":"https://www.referrer-example.com/home","ip":"198.51.100.14","created_at":"2025-05-19T14:22:00Z"},"citizen":{"id":"citizen_seller_001","created_at":"2025-05-18T07:35:00Z","mobile":"+1-555-987-0000","name":"Seller One (Test)"},"id":"seller_001_test","created_at":"2025-05-18T07:40:00Z"};
}
