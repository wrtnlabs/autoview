
import Component from "../components/531";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"ns-60f5ff3a-test-id","network_configuration_id":"nc-abcdef12-test","name":"Sample Network Settings (Test)","subnet_id":"subnet-1234abcd-test","region":"example-region-1"};
}
