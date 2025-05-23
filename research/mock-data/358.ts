
import Component from "../components/358";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"key":"mit","name":"MIT License (Sample)","url":"https://api.example.org/licenses/mit-sample","spdx_id":"MIT","node_id":"NODEID_LIC_MIT_SAMPLE","html_url":"https://www.example.com/licenses/mit-sample"},{"key":"apache-2.0","name":"Apache License 2.0 (Test)","url":"https://api.example.org/licenses/apache-2.0-test","spdx_id":"Apache-2.0","node_id":"NODEID_LIC_APACHE2_TEST"},{"key":"gpl-3.0","name":"GNU General Public License v3.0 (Sample)","url":null,"spdx_id":null,"node_id":"NODEID_LIC_GPL3_SAMPLE","html_url":"https://www.example.org/licenses/gpl-3.0-sample"}];
}
