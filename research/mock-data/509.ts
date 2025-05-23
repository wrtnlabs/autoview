
import Component from "../components/509";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"repository_id":101,"repository_name":"sample-repo-dummy","repository_full_name":"sample-org-dummy/sample-repo-dummy","properties":[{"property_name":"team","value":"qa-team-sample"},{"property_name":"owners","value":["dev.user@example.org","qa.lead@example.org"]},{"property_name":"description","value":"A sample repository for UI component tests (Dummy Data)."},{"property_name":"releaseCycle","value":null}]},{"repository_id":202,"repository_name":"test-config","repository_full_name":"example-org/test-config","properties":[{"property_name":"config_version","value":"v1.2.3-sample"},{"property_name":"tags","value":["test","sample","ui-mock"]},{"property_name":"last_updated_by","value":"ci-bot@example.org"},{"property_name":"notes","value":null}]}];
}
