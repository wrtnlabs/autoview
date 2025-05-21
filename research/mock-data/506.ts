
import Component from "../components/506";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"property_name":"project_description","url":"https://api.example.com/v1/orgs/sample-org/custom_properties/project_description","source_type":"organization","value_type":"string","required":false,"default_value":null,"description":"A sample description for this property used in UI testing. All content is fictional.","allowed_values":null,"values_editable_by":"org_actors"},{"property_name":"priority_level","url":"https://api.example.com/v1/orgs/sample-org/custom_properties/priority_level","source_type":"organization","value_type":"single_select","required":true,"default_value":"Medium","description":"Defines the priority level for items.","allowed_values":["Low","Medium","High","Critical"],"values_editable_by":"org_and_repo_actors"},{"property_name":"tags","url":"https://api.example.com/v1/enterprises/sample-enterprise/custom_properties/tags","source_type":"enterprise","value_type":"multi_select","required":false,"default_value":["UI","Backend"],"description":"Tags associated with the item for categorization purposes.","allowed_values":["UI","Backend","API","Database","Infrastructure"],"values_editable_by":"org_and_repo_actors"},{"property_name":"is_active","value_type":"true_false","required":true,"default_value":"true"}];
}
