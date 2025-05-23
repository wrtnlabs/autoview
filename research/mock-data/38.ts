
import Component from "../components/38";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"parent":null,"children":[{"id":"b2222222-2222-2222-2222-222222222222","code":"NOTEBOOK","parent_id":"a1111111-1111-1111-1111-111111111111","name":"Notebook (Sample)","created_at":"2025-05-19T09:05:00Z","children":[{"id":"c3333333-3333-3333-3333-333333333333","code":"15IN","parent_id":"b2222222-2222-2222-2222-222222222222","name":"15 inches (Demo)","created_at":"2025-05-19T09:10:00Z","children":[]}]},{"id":"d4444444-4444-4444-4444-444444444444","code":"SMARTPH","parent_id":"a1111111-1111-1111-1111-111111111111","name":"Smartphones (Test)","created_at":"2025-05-19T09:07:00Z","children":[]}],"id":"a1111111-1111-1111-1111-111111111111","code":"ELEC","parent_id":null,"name":"Electronics (Test)","created_at":"2025-05-19T09:00:00Z"};
}
