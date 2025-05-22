
import Component from "../components/39";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"children":[{"children":[],"id":"e817b989-1234-4e98-b2a7-111111111111","code":"ELEC-SP","parent_id":"f47ac10b-58cc-4372-a567-0e02b2c3d479","name":"Smartphones (Sample)","created_at":"2025-05-19T08:30:00Z"},{"children":[{"children":[],"id":"b9b221d6-5678-4f66-aa23-333333333333","code":"ELEC-LAP-UL","parent_id":"a8a110c5-1234-4e77-bb12-222222222222","name":"Ultrabooks (Sample)","created_at":"2025-05-19T09:00:00Z"}],"id":"a8a110c5-1234-4e77-bb12-222222222222","code":"ELEC-LAP","parent_id":"f47ac10b-58cc-4372-a567-0e02b2c3d479","name":"Laptops (Sample)","created_at":"2025-05-19T08:45:00Z"}],"id":"f47ac10b-58cc-4372-a567-0e02b2c3d479","code":"ELEC","parent_id":null,"name":"Electronics (Test)","created_at":"2025-05-19T08:00:00Z"},{"children":[{"children":[],"id":"d2d443f8-ed01-4c44-dd45-555555555555","code":"CLOTH-MEN","parent_id":"c1c332e7-9abc-4d55-cc34-444444444444","name":"Men's Clothing (Sample)","created_at":"2025-05-18T10:30:00Z"},{"children":[],"id":"e3e55409-fe12-4b33-ee56-666666666666","code":"CLOTH-WOMEN","parent_id":"c1c332e7-9abc-4d55-cc34-444444444444","name":"Women's Clothing (Sample)","created_at":"2025-05-18T10:45:00Z"}],"id":"c1c332e7-9abc-4d55-cc34-444444444444","code":"CLOTH","parent_id":null,"name":"Clothing (Test)","created_at":"2025-05-18T10:00:00Z"}];
}
