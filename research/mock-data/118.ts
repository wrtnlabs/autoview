
import Component from "../components/118";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"type":"seller","member":{"id":"member_001","nickname":"TestBuyer (Sample)","emails":[{"id":"email_001","value":"test.user@example.com","created_at":"2025-05-01T10:05:00Z"},{"id":"email_002","value":"member.secondary@example.org","created_at":"2025-05-01T10:10:00Z"}],"created_at":"2025-05-01T10:00:00Z"},"customer":{"id":"customer_001","channel":{"id":"channel_01","created_at":"2025-04-01T08:00:00Z","code":"web","name":"Web Store (Sample)"},"external_user":{"id":"external_user_001","citizen":{"id":"citizen_ext_001","created_at":"2025-04-28T11:30:00Z","mobile":"+10000000001","name":"Facebook User (Sample)"},"created_at":"2025-04-28T11:30:00Z","uid":"ext123456","application":"facebook","nickname":"fb_user_test","data":{"profileUrl":"https://facebook.example.com/profile/ext123456","locale":"en_US"}},"href":"https://www.example.com/path/to/shop","referrer":"https://referrer.example.com/path","ip":"203.0.113.42","created_at":"2025-05-19T14:00:00Z"},"citizen":{"id":"citizen_001","created_at":"2025-05-02T09:00:00Z","mobile":"+15555550123","name":"John Doe (Test)"},"id":"seller_001","created_at":"2025-05-20T12:00:00Z"};
}
