
import Component from "../components/358";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"key":"mit","name":"MIT License (Test)","url":"https://api.example.org/licenses/mit-test","spdx_id":"MIT","node_id":"NODEID_sample_license_mit","html_url":"https://www.example.org/licenses/mit-test.html"},{"key":"apache-2.0","name":"Apache License 2.0 (Sample)","url":null,"spdx_id":"Apache-2.0","node_id":"NODEID_sample_license_apache"},{"key":"sample-license","name":"Sample License (Dummy)","url":"https://www.example.com/licenses/sample-license","spdx_id":null,"node_id":"NODEID_sample_license_dummy"}];
}
