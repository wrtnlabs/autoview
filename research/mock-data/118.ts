
import Component from "../components/118";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"type":"seller","member":{"id":"member_1001","nickname":"seller_member_test","emails":[{"id":"member_email_1","value":"seller.member@example.com","created_at":"2024-11-30T10:05:00Z"},{"id":"member_email_2","value":"seller.contact@example.org","created_at":"2025-02-15T14:30:00Z"}],"created_at":"2024-11-30T10:00:00Z"},"customer":{"id":"customer_501","channel":{"id":"channel_01","created_at":"2024-12-01T07:45:00Z","code":"WEB_SALES","name":"Web Sales Channel"},"external_user":{"id":"extuser_301","citizen":{"id":"citizen_601","created_at":"2025-02-20T11:00:00Z","mobile":"+1-555-0102","name":"John Doe (Test)"},"created_at":"2025-05-01T09:00:00Z","uid":"ext-uid-789","application":"SOCIAL_LOGIN","nickname":"social_johndoe","data":{"profileUrl":"https://social.example.com/johndoe","membershipLevel":"gold"}},"href":"https://www.example.com/shop/seller_001","referrer":"https://referrer.example.com/landing","ip":"203.0.113.42","created_at":"2025-05-18T15:22:00Z"},"citizen":{"id":"citizen_502","created_at":"2025-04-15T10:20:00Z","mobile":"+1-555-0199","name":"Jane Doe (Test)"},"id":"seller_001","created_at":"2025-05-19T09:15:00Z"};
}
