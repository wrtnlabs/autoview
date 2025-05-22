
import Component from "../components/508";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"property_name":"Sample Property (Test)","url":"https://api.example.com/v1/organizations/123456/custom-properties/sample-property","source_type":"organization","value_type":"multi_select","required":false,"default_value":["Option A Sample","Option B Sample"],"description":"A sample multi-select custom property for UI testing purposes. All listed values are fictional and for demonstration only.","allowed_values":["Option A Sample","Option B Sample","Option C Sample","Option D Sample"],"values_editable_by":"org_and_repo_actors"};
}
