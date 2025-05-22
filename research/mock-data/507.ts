
import Component from "../components/507";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"property_name":"Department (Test)","url":"https://api.example.com/v1/organizations/sample-org/custom_properties/department","source_type":"organization","value_type":"multi_select","required":true,"default_value":["Engineering","Marketing"],"description":"Select one or more sample departments for testing UI rendering. All values are fictional and for demonstration only.","allowed_values":["Engineering","Marketing","Sales","Support"],"values_editable_by":"org_and_repo_actors"};
}
