
import Component from "../components/11";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return JSON.parse({"id":"123e4567-e89b-12d3-a456-426614174000","created_at":"2025-05-19T14:30:00Z","code":"DEPOSIT_CODE_SAMPLE_001","source":"online_store_test","direction":1});
}
