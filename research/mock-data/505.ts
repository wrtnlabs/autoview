
import Component from "../components/505";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"property_name":"Department (Test)","url":"https://api.example.com/orgs/sample-org/custom_properties/department_test","source_type":"organization","value_type":"single_select","required":true,"default_value":"Engineering","description":"Selects the department for the user in this sample organization. All values are fictional and for testing only.","allowed_values":["Engineering","Marketing","Sales","Support"],"values_editable_by":"org_actors"},{"property_name":"Preferred Languages (Sample)","source_type":"enterprise","value_type":"multi_select","default_value":["JavaScript","Python"],"description":null,"allowed_values":["JavaScript","Python","TypeScript","Ruby","Go"],"values_editable_by":"org_and_repo_actors"},{"property_name":"Project Code","value_type":"string","required":false,"default_value":null,"description":"Unique code identifying the project. (Test Data)","allowed_values":null},{"property_name":"2FA Enabled","url":"https://api.example.com/orgs/sample-org/custom_properties/2fa_enabled","source_type":"organization","value_type":"true_false","required":false,"default_value":"false","description":"Indicates whether two-factor authentication is enforced for this organization. (Sample)","allowed_values":null,"values_editable_by":null}];
}
