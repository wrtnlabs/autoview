
import Component from "../components/997";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":1,"key":"primary_key_sample"},{"id":42,"key":"secondary_key_dummy"},{"id":100,"key":"misc_key_test_001"}];
}
