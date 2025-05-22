
import Component from "../components/358";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"key":"example-license","name":"Example License (Dummy)","url":"https://licenses.example.com/example-license","spdx_id":"EXAMPLE-1.0","node_id":"NODEID_LICENSE_EXAMPLE_1","html_url":"https://www.example.com/licenses/example-license"},{"key":"test-license","name":"Test License (Sample)","url":null,"spdx_id":null,"node_id":"NODEID_LICENSE_TEST_2"}];
}
