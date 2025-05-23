
import Component from "../components/109";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"parent":null,"children":[{"children":[{"children":[],"id":"164e4f27-b1a2-45c6-9f0b-0b4c6d789012","code":"15INCH","parent_id":"d4e3f2b1-65a2-4c1b-8f2f-4c5d6e7f8a9b","name":"15 Inches (Demo)","created_at":"2025-05-19T12:15:00Z"}],"id":"d4e3f2b1-65a2-4c1b-8f2f-4c5d6e7f8a9b","code":"NOTEBOOK","parent_id":"b3c19a2e-84d1-4d5d-9f79-1af3b0a1e2c3","name":"Notebooks (Sample)","created_at":"2025-05-19T12:10:00Z"},{"children":[],"id":"f5a6b7c8-d9e0-1234-abcd-abcdef123456","code":"TV","parent_id":"b3c19a2e-84d1-4d5d-9f79-1af3b0a1e2c3","name":"Televisions (Test)","created_at":"2025-05-19T12:20:00Z"}],"id":"b3c19a2e-84d1-4d5d-9f79-1af3b0a1e2c3","code":"ELEC","parent_id":null,"name":"Electronics (Test)","created_at":"2025-05-19T12:00:00Z"};
}
