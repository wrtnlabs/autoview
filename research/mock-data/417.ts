
import Component from "../components/417";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"name":"SAMPLE_VARIABLE_TEST","value":"dummy_value_for_ui_test","created_at":"2025-05-10T08:15:30Z","updated_at":"2025-05-18T12:45:00Z","visibility":"selected","selected_repositories_url":"https://api.example.com/orgs/sample-org/actions/variables/SAMPLE_VARIABLE_TEST/selected_repositories"};
}
