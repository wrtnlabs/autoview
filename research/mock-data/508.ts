
import Component from "../components/508";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"property_name":"Regional Access (Test)","url":"https://api.example.com/orgs/sample-org/custom_properties/regional_access","source_type":"enterprise","value_type":"multi_select","required":true,"default_value":["Europe","Asia-Pacific"],"description":"Specifies which regions this organization operates in for demonstration purposes. All values are fictional and for UI testing only.","allowed_values":["North America","Europe","Asia-Pacific","South America","Africa","Antarctica"],"values_editable_by":"org_and_repo_actors"};
}
