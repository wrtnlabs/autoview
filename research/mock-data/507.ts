
import Component from "../components/507";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"property_name":"Test Custom Property","url":"https://api.example.com/v1/organizations/123/custom_properties/test_custom_property","source_type":"organization","value_type":"single_select","required":true,"default_value":"option_alpha","description":"A sample description for this test custom property. It demonstrates how optional fields are handled and provides context for UI component rendering.","allowed_values":["option_alpha","option_beta","option_gamma"],"values_editable_by":"org_and_repo_actors"};
}
