
import Component from "../components/159";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":"00000000-0000-0000-0000-000000000001","code":"ELEC_SAMP","parent_id":null,"name":"Electronics (Sample)","created_at":"2025-05-19T10:00:00Z","children":[{"id":"00000000-0000-0000-0000-000000000002","code":"COMP_TEST","parent_id":"00000000-0000-0000-0000-000000000001","name":"Computers & Accessories (Test)","created_at":"2025-05-19T10:30:00Z","children":[{"id":"00000000-0000-0000-0000-000000000003","code":"LAPTOP_SAMP","parent_id":"00000000-0000-0000-0000-000000000002","name":"Laptops (Sample)","created_at":"2025-05-19T11:00:00Z","children":[]}]},{"id":"00000000-0000-0000-0000-000000000004","code":"CAMERA_SAM","parent_id":"00000000-0000-0000-0000-000000000001","name":"Cameras (Sample)","created_at":"2025-05-19T10:45:00Z","children":[]}]},{"id":"00000000-0000-0000-0000-000000000005","code":"HOME_GARD_SAMP","parent_id":null,"name":"Home & Garden (Sample)","created_at":"2025-05-19T12:00:00Z","children":[{"id":"00000000-0000-0000-0000-000000000006","code":"KITCH_TEST","parent_id":"00000000-0000-0000-0000-000000000005","name":"Kitchen (Test)","created_at":"2025-05-19T12:30:00Z","children":[]}]}];
}
