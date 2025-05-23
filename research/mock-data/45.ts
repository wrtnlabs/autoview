
import Component from "../components/45";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"pagination":{"current":1,"limit":2,"records":5,"pages":3},"data":[{"categories":[{"children":[{"children":[],"id":"cat-1001-1","code":"ELEC-MOB","parent_id":"3fa85f64-5717-4562-b3fc-2c963f66afa6","name":"Mobile Devices (Sample)","created_at":"2025-05-18T10:00:00Z"},{"children":[],"id":"cat-1001-2","code":"ELEC-CAM","parent_id":"3fa85f64-5717-4562-b3fc-2c963f66afa6","name":"Cameras & Photography (Sample)","created_at":"2025-05-18T10:30:00Z"}],"id":"cat-1001","code":"ELEC","parent_id":null,"name":"Electronics (Test)","created_at":"2025-05-18T09:00:00Z"},{"children":[{"children":[],"id":"cat-2001-1","code":"HOME_DECOR","parent_id":"1e7a0384-125f-4f82-9e8b-dc7f2b5a9c3d","name":"Home Decor (Sample)","created_at":"2025-05-17T09:00:00Z"}],"id":"cat-2001","code":"HOME_KITCH","parent_id":null,"name":"Home & Kitchen (Test)","created_at":"2025-05-17T08:15:00Z"}],"id":"channel-001","created_at":"2025-05-19T12:00:00Z","code":"CHNL_A_TEST","name":"Sample Channel A (Test)"},{"categories":[],"id":"channel-002","created_at":"2025-05-18T15:45:00Z","code":"CHNL_B_TEST","name":"Sample Channel B (Test)"}]};
}
