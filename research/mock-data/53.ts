
import Component from "../components/53";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"type":"customer","member":{"citizen":{"id":"CIT-3002","created_at":"2025-05-18T09:00:00Z","mobile":"010-8765-4321","name":"Sample Member (Test)"},"seller":{"id":"S-4001","created_at":"2025-05-18T09:05:00Z"},"administrator":null,"id":"M-1001","nickname":"sample_member_test","emails":[{"id":"E-5001","value":"sample.member@example.com","created_at":"2025-05-18T09:01:00Z"},{"id":"E-5002","value":"alternate.email@example.org","created_at":"2025-05-18T09:02:00Z"}],"created_at":"2025-05-18T09:00:00Z"},"citizen":{"id":"CIT-3001","created_at":"2025-05-19T14:20:00Z","mobile":"010-1234-5678","name":"Sample User (Test)"},"id":"CUST-7001","channel":{"id":"C-2001","created_at":"2025-05-01T12:00:00Z","code":"web_app","name":"Web Application (Sample)"},"external_user":{"id":"EX-6001","citizen":null,"created_at":"2025-05-17T08:00:00Z","uid":"external_uid_789","application":"oauth_provider_sample","nickname":"ext_user_sample","data":{"profileUrl":"https://external.example.org/user/profile","roles":["guest","tester"]}},"href":"https://www.example.com/shop?session=abc123sample","referrer":"https://referrer.example.net/landing?test","ip":"192.0.2.123","created_at":"2025-05-19T14:30:00Z"};
}
