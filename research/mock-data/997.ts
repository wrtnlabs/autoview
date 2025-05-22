
import Component from "../components/997";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"id":1,"key":"alpha_key_sample"},{"id":2,"key":"betaKey123_test"},{"id":3,"key":"gamma_key_dummy"}];
}
