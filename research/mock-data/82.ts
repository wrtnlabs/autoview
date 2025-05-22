
import Component from "../components/82";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"ticket_payments":[{"id":"tpp_001_test","ticket":{"id":"tkt_001_test","customer":{"type":"customer","member":null,"citizen":null,"id":"cust_001_test","channel":{"id":"ch_001_test","created_at":"2025-05-01T08:00:00Z","code":"WEB_TEST","name":"Web Test Channel (Test)"},"external_user":null,"href":"https://www.example.com/shop/test-session","referrer":null,"ip":"192.168.1.100","created_at":"2025-05-01T08:00:00Z"},"coupon":{"id":"cpn_001_test","designer":{"id":"adm_001_test","created_at":"2025-05-10T12:00:00Z"},"inventory":{"volume":1000,"volume_per_citizen":1},"criterias":[],"discount":{"unit":"amount","value":5,"threshold":20,"limit":null,"multiplicative":false},"restriction":{"access":"public","exclusive":false,"volume":1000,"volume_per_citizen":1,"expired_in":30,"expired_at":"2025-06-15T00:00:00Z"},"name":"Test Discount Coupon","opened_at":"2025-05-11T00:00:00Z","closed_at":"2025-05-31T23:59:59Z","created_at":"2025-05-10T12:00:00Z"},"created_at":"2025-05-12T09:00:00Z","expired_at":"2025-06-12T23:59:59Z"},"created_at":"2025-05-12T09:00:00Z"}],"cash":100,"deposit":0,"mileage":20,"ticket":5,"nominal":125,"real":105};
}
