
import Component from "../components/531";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"id":"test-ns-0001","network_configuration_id":"test-nc-0002","name":"Sample Network Settings (Test)","subnet_id":"subnet-0abc123def456sample","region":"us-west-2"};
}
