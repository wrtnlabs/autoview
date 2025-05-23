
import Component from "../components/84";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"ticket_payments":[{"id":"tp_001","ticket":{"id":"ticket_001","customer":{"type":"customer","member":null,"citizen":null,"id":"cust_001","channel":{"id":"ch_123","created_at":"2025-05-15T08:30:00Z","code":"web","name":"Web Store (Test)"},"external_user":null,"href":"https://www.example.com/shop","referrer":null,"ip":"192.0.2.1","created_at":"2025-05-15T08:30:00Z"},"coupon":{"id":"coup_001","designer":{"id":"admin_001","created_at":"2025-05-10T09:00:00Z"},"inventory":{"volume":500,"volume_per_citizen":1},"criterias":[],"discount":{"unit":"amount","value":15,"threshold":100,"limit":null,"multiplicative":false},"restriction":{"access":"public","exclusive":false,"volume":500,"volume_per_citizen":1,"expired_in":30,"expired_at":null},"name":"Spring Sale Coupon (Test)","opened_at":"2025-04-01T00:00:00Z","closed_at":"2025-06-01T00:00:00Z","created_at":"2025-03-28T12:00:00Z"},"created_at":"2025-05-01T10:00:00Z","expired_at":"2025-05-30T00:00:00Z"},"created_at":"2025-05-01T10:00:00Z"}],"cash":80,"deposit":20,"mileage":5,"ticket":15,"nominal":140,"real":120};
}
