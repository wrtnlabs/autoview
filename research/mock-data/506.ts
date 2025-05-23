
import Component from "../components/506";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"property_name":"welcome_message_sample","url":"https://api.example.com/v1/org/custom_properties/welcome_message_sample","source_type":"organization","value_type":"string","required":true,"default_value":"Welcome to the Sample Org!","description":"A sample welcome message for new users to greet them upon joining. (Test Data)","values_editable_by":"org_actors"},{"property_name":"project_phase_dummy","url":"https://api.example.com/v1/org/custom_properties/project_phase_dummy","source_type":"organization","value_type":"single_select","required":false,"default_value":"planning","description":"Select the current phase of the project. (Sample)","allowed_values":["planning","development","testing","deployment"],"values_editable_by":"org_and_repo_actors"},{"property_name":"supported_platforms_test","source_type":"enterprise","value_type":"multi_select","required":false,"default_value":["web","mobile"],"description":null,"allowed_values":["web","mobile","desktop","iot","vr"]},{"property_name":"enable_feature_x_dummy","url":"https://api.example.com/v1/enterprises/custom_properties/enable_feature_x_dummy","source_type":"enterprise","value_type":"true_false","required":false,"default_value":null,"description":"Flag to enable the experimental Feature X in the interface. For UI testing purposes only.","values_editable_by":null}];
}
