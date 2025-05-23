
import Component from "../components/505";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"property_name":"Test Property Alpha","url":"https://api.example.com/orgs/sample-org/custom-properties/alpha","source_type":"organization","value_type":"string","required":true,"default_value":"AlphaDefault","description":"This is a sample description for the string property. It is used for UI testing purposes.","values_editable_by":"org_and_repo_actors"},{"property_name":"Test Select Option","url":"https://api.example.com/orgs/sample-org/custom-properties/select","source_type":"enterprise","value_type":"single_select","required":false,"default_value":"option1","description":null,"allowed_values":["option1","option2","option3"],"values_editable_by":null},{"property_name":"Test Multi-Select","url":"https://api.example.com/orgs/sample-org/custom-properties/multiselect","source_type":"organization","value_type":"multi_select","required":false,"default_value":["beta","gamma"],"description":"Multi-select sample property for UI testing.","allowed_values":["alpha","beta","gamma"],"values_editable_by":"org_actors"},{"property_name":"Test Toggle Flag","value_type":"true_false","required":false,"default_value":null,"description":"Boolean flag used for testing purposes. Default is null."}];
}
