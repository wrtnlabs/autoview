
import Component from "../components/997";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":101,"key":"sample_key_101_test"},{"id":202,"key":"demo_key_202_sample"},{"id":303,"key":"test_key_303_dummy"}];
}
