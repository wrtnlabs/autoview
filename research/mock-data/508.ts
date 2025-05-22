
import Component from "../components/508";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"property_name":"Environment Type (Sample)","url":"https://api.example.com/orgs/sample-org/properties/environment-type","source_type":"organization","value_type":"multi_select","required":true,"default_value":["Development","Staging"],"description":"Select the environment(s) associated with this project. This is for testing UI components only.","allowed_values":["Development","Staging","Production (Test)","QA Environment Sample"],"values_editable_by":"org_and_repo_actors"};
}
