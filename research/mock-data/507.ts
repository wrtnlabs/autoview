
import Component from "../components/507";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"property_name":"Sample Tags (Test)","url":"https://api.example.com/v1/organizations/sample-org/custom_properties/sample_tags","source_type":"organization","value_type":"multi_select","required":false,"default_value":["Tag A","Tag B"],"description":"A sample multi-select custom property for tagging organization items in UI tests.","allowed_values":["Tag A","Tag B","Tag C","Tag D","Tag E"],"values_editable_by":"org_and_repo_actors"};
}
