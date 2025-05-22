
import Component from "../components/163";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"pagination":{"current":1,"limit":10,"records":2,"pages":1},"data":[{"categories":[{"children":[{"children":[],"id":"cat-101","code":"SMART","parent_id":"f47ac10b-58cc-4372-a567-0e02b2c3d479","name":"Smartphones (Test)","created_at":"2025-05-19T09:10:00Z"},{"children":[],"id":"cat-102","code":"LAPTOP","parent_id":"f47ac10b-58cc-4372-a567-0e02b2c3d479","name":"Laptops (Sample)","created_at":"2025-05-19T09:12:00Z"}],"id":"cat-100","code":"ELEC","parent_id":null,"name":"Electronics (Sample)","created_at":"2025-05-19T09:05:00Z"},{"children":[],"id":"cat-200","code":"HOME","parent_id":null,"name":"Home & Garden (Sample)","created_at":"2025-05-19T09:06:00Z"}],"id":"channel-001","created_at":"2025-05-19T09:00:00Z","code":"CH-001","name":"Online Store (Sample)"},{"categories":[{"children":[{"children":[],"id":"cat-301","code":"SKIN","parent_id":"9c858901-8a57-4791-81fe-4c455b099bc9","name":"Skincare (Test)","created_at":"2025-05-19T10:10:00Z"}],"id":"cat-300","code":"HEALTH","parent_id":null,"name":"Health & Beauty (Test)","created_at":"2025-05-19T10:05:00Z"}],"id":"channel-002","created_at":"2025-05-19T10:00:00Z","code":"CH-002","name":"Mobile App (Sample)"}]};
}
