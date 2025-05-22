
import Component from "../components/531";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"ns-001-test-sample","network_configuration_id":"netcfg-12345-sample","name":"Test Network Settings (Sample)","subnet_id":"subnet-abcde-sample","region":"test-region-1"};
}
