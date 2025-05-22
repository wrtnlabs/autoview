
import Component from "../components/506";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"property_name":"Department (Test)","url":"https://api.example.com/v1/orgs/example-org/custom_properties/department_test","source_type":"organization","value_type":"single_select","required":true,"default_value":"Engineering","description":"A test property for UI component testing: lists organization departments. Fictional data only.","allowed_values":["Engineering","Marketing","Sales","Human Resources"],"values_editable_by":"org_actors"},{"property_name":"Onboarding Completed (Sample)","source_type":"enterprise","value_type":"true_false","required":false,"default_value":null,"description":null,"allowed_values":null,"values_editable_by":null},{"property_name":"Tags (Demo Sample)","value_type":"multi_select","required":false,"default_value":["beta_user","internal"],"description":"A sample multi-select tags property for grouping test accounts.","allowed_values":["beta_user","internal","external_partner","test_group","priority"],"values_editable_by":"org_and_repo_actors"}];
}
