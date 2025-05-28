
import Component from "../components/825";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"property_name":"owner_email","value":"test.user@example.com"},{"property_name":"tags","value":["alpha-test","ui-demo","mock-data"]},{"property_name":"deployment_urls","value":["https://api.example.com/v1/test-deployment","https://staging.example.com/test-app"]},{"property_name":"description","value":"This is a sample description for this custom property. For UI testing purposes only."},{"property_name":"last_updated","value":null}];
}
