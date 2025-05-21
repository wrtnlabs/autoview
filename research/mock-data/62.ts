
import Component from "../components/62";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"123e4567-e89b-12d3-a456-426614174000","customer":{"type":"customer","member":{"member_id":"member_test_001","level":"Gold (Sample)"},"citizen":{"verified":true,"citizen_id":"citizen_test_001"},"id":"customer_test_001","channel":{"id":"channel_test_01","created_at":"2025-01-01T00:00:00Z","code":"WEB","name":"Website Channel (Test)"},"external_user":{"external_service":"social_media_test","user_id":"ext_user_001"},"href":"https://shop.example.com/test-page","referrer":"https://www.example.com/referrer/sample","ip":"192.0.2.123","created_at":"2025-05-19T14:30:00Z"},"publish":{"method":"manual_test","published_by":"Test Admin (Sample)","published_at":"2025-05-20T08:00:00Z"},"created_at":"2025-05-20T08:15:00Z","value":150.75};
}
