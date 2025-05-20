
import Component from "../components/9";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return JSON.parse({"pagination":{"current":1,"limit":10,"records":2,"pages":1},"data":[{"id":"3fa85f64-5717-4562-b3fc-2c963f66afa6","created_at":"2025-05-19T15:30:00Z","code":"DEP-00001","source":"TestVendor (Sample)","direction":1},{"id":"e8ffac0f-9df3-4a9a-8b0e-1f2d3c4e5b6a","created_at":"2025-05-18T09:15:30Z","code":"DEP-00002","source":"SampleBank API","direction":-1}]});
}
