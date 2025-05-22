
import Component from "../components/509";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"repository_id":101,"repository_name":"sample-repo","repository_full_name":"example-org/sample-repo","properties":[{"property_name":"environment","value":"development"},{"property_name":"labels","value":["backend","api","test"]},{"property_name":"description","value":null}]},{"repository_id":202,"repository_name":"test-repo","repository_full_name":"demo-org/test-repo","properties":[{"property_name":"version","value":"v1.0-test"},{"property_name":"owners","value":["alice.sample","bob.test"]},{"property_name":"maintenance_window","value":"Sundays 02:00-03:00 (Sample)"}]}];
}
