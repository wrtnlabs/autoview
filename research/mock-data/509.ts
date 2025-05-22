
import Component from "../components/509";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"repository_id":101,"repository_name":"sample-repo-alpha","repository_full_name":"example-org/sample-repo-alpha","properties":[{"property_name":"build_status","value":"passing"},{"property_name":"owners","value":["team-alpha","team-beta"]},{"property_name":"documentation_url","value":"https://www.example.com/docs/sample-repo-alpha"},{"property_name":"notes","value":null}]},{"repository_id":202,"repository_name":"test-repo-beta","repository_full_name":"example-org/test-repo-beta","properties":[{"property_name":"last_deployment_date","value":"2025-05-19T09:15:00Z"},{"property_name":"enabled_features","value":["feature-x","feature-y","feature-z"]},{"property_name":"owner_email","value":"owner.test@example.org"},{"property_name":"misc_tags","value":[]},{"property_name":"deprecated","value":null}]}];
}
