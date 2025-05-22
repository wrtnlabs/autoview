
import Component from "../components/41";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"parent":{"parent":null,"id":"e4a1f2d3-5678-90ab-cdef-1234567890ab","code":"CAT_PARENT_TEST","parent_id":null,"name":"Parent Category (Test)","created_at":"2025-05-18T09:15:00Z"},"id":"f1d2e3c4-6789-01ab-cdef-0987654321ab","code":"CAT_CHILD_TEST","parent_id":"e4a1f2d3-5678-90ab-cdef-1234567890ab","name":"Child Category (Test)","created_at":"2025-05-19T12:00:00Z"};
}
