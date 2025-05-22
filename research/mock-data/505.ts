
import Component from "../components/505";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"property_name":"Department (Test)","url":"https://api.example.com/v1/orgs/sample-org/custom_properties/department","source_type":"organization","value_type":"single_select","required":true,"default_value":"Engineering","description":"The department within the organization for classification purposes. (Test)","allowed_values":["Engineering","Marketing","Sales","Research"],"values_editable_by":"org_actors"},{"property_name":"IsActive Flag (Sample)","url":"https://api.example.com/v1/orgs/sample-org/custom_properties/is_active_flag","source_type":"organization","value_type":"true_false","required":false,"default_value":null,"description":"Indicates whether the custom property is currently active. (Sample)"},{"property_name":"Tags","value_type":"multi_select","default_value":["TagA","TagB"],"description":"List of tags associated with the organization for categorization. (Sample)","allowed_values":["TagA","TagB","TagC","TagD"],"values_editable_by":"org_and_repo_actors","source_type":"enterprise"}];
}
